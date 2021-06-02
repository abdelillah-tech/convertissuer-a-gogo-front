import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import PubSub from 'pubsub-js';
import alertType from '../../common/AlertTypes';

import 'brace/mode/javascript';
import 'brace/mode/python';

import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/xcode';
import 'brace/theme/terminal';
import 'brace/theme/twilight';


import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ExecuteService from '../../api/Executor';
import FileUploadService from '../../api/FileUpload';
import SendIcon from '@material-ui/icons/Send';
import { Typography } from '@material-ui/core';
import { Context } from "../../common/Store";
import { CircularProgressWithLabel } from "../../common/CircularProgressWithLabel"
import CircularProgress from '@material-ui/core/CircularProgress';

import { CODE_EXEC_COOLDOWN } from "../../constants"


const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    editorContainer: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center",
    },
    inputs: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center",
    },
    aceEditor: {
        margin: theme.spacing(1),
        maxWidth: '100vw',
        border: "2px solid #ff8C00",
        borderRadius: '2px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },

    flexEven: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
}));

const Editor = () => {

    const themes = [
        'monokai',
        'github',
        'xcode',
        'terminal',
        'twilight',
    ]

    const languages = [
        'javascript',
        'python',
    ]

    const [state, dispatch] = useContext(Context);

    const startup = new Map();
    startup.set('javascript', 'console.log("Hello World!")')
    startup.set('python', 'print("Hello World!")')

    const [theme, setTheme] = useState(themes[0]);

    const [language, setLanguage] = useState(localStorage.getItem("language") || languages[1]);

    const [fontSize, setFontSize] = useState(17);

    const [results, setResults] = useState(null);

    const [codeExecTime, setCodeExecTime] = useState(0);

    const [waitExecuteResponse, setWaitExecuteResponse] = useState(false);
    const [executeTimer, setExecuteTimer] = useState(false);
    const [timerValue, setTimerValue] = useState(0);

    const [waitUploadResponse, setWaitUploadResponse] = useState(false);

    const [outputColor, setOutputColor] = useState('white')

    const [code, setCode] = useState(startup.get(language));

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const onChangeCode = (value) => {
        setCode(value)
    }

    const handleChangeTheme = (event) => {
        setTheme(event.target.value);
    }

    const handleChangeLanguage = (event) => {
        localStorage.setItem("language", event.target.value);
        setLanguage(event.target.value);
        setCode(startup.get(event.target.value))
    }

    const handleChangeFile = (event) => {
        setWaitUploadResponse(true);
        dispatch({
            type: "CHARGEFILE",
            payload: event.target.files[0]
        })
        console.log(JSON.stringify(event.target.value))
        const data = new FormData()
        data.append('file', state.selectedFile)
        FileUploadService.upload(data, state.token)
            .then((response) => {
                dispatch({
                    type: "CHARGESERVERFILE",
                    payload: response.data.filename
                })

                setWaitUploadResponse(false)
            }).catch(e => {
                setWaitUploadResponse(false)
                if (e.response.data.statusCode === 400) {
                    PubSub.publish('alert', {
                        alertType: alertType.error,
                        message: e.response.data.message.join(", ")
                    })
                } else {
                    PubSub.publish('alert', {
                        alertType: alertType.error,
                        message: 'Sorry! We cannot upload your file. Please try again!'
                    })
                }
            })
    }

    const handleExecute = () => {
        setWaitExecuteResponse(true)
        ExecuteService.execute(language, code, state.token)
            .then((response) => {
                if (!response.data.result.result.stderr) {

                    setResults(response.data.result.result.stdout)
                    setCodeExecTime(response.data.result.result.executionTime)
                    setOutputColor("white")
                } else {
                    setResults(`${response.data.result.result.stdout ? response.data.result.result.stdout : ''}\n\n${response.data.result.result.stderr}`);
                    setCodeExecTime(response.data.result.result.executionTime)
                    setOutputColor("red")
                }

                setWaitExecuteResponse(false)
                startTimer(CODE_EXEC_COOLDOWN)


            }).catch(e => {
                setWaitExecuteResponse(false)
                startTimer(CODE_EXEC_COOLDOWN)
                if (e.response.data.statusCode === 400) {
                    PubSub.publish('alert', {
                        alertType: alertType.error,
                        message: e.response.data.message.join(", ")
                    })
                } else {
                    PubSub.publish('alert', {
                        alertType: alertType.error,
                        message: 'Sorry! Something went wrong. Please try again!'
                    })
                }
            });
    }

    const classes = useStyles();

    const startTimer = async (millis) => {
        setExecuteTimer(true)
        for (let i = millis / 1000; i > 0; i--) {
            setTimerValue(rangeMap(i, millis / 1000, 0, 100, 0))
            await new Promise((res, rej) => setTimeout(() => res(), 1000))
        }
        setExecuteTimer(false)
    }

    const rangeMap = (num, in_min, in_max, out_min, out_max) => {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    return (
        <div className={classes.container}>
            <div className={classes.inputs}>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="theme-label">Theme</InputLabel>
                        <Select
                            labelId="theme-label"
                            id="theme"
                            value={theme}
                            onChange={handleChangeTheme}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            {themes.map((theme) => (
                                <MenuItem key={theme} value={theme}>
                                    {theme}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="language-label">Language</InputLabel>
                        <Select
                            labelId="language-label"
                            id="language"
                            value={language}
                            onChange={handleChangeLanguage}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            {languages.map((language) => (
                                <MenuItem key={language} value={language}>
                                    {language}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        <Typography>
                            {
                                waitUploadResponse
                                    ? <CircularProgress />
                                    : state.selectedFile ? state.selectedFile.name : "Upload File"
                            }
                        </Typography>
                        <input
                            type="file"
                            onChange={handleChangeFile}
                            hidden
                        />
                    </Button>

                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.formControl}
                        disabled={waitExecuteResponse || executeTimer}
                        onClick={handleExecute}
                    >
                        <Typography component="div" className={classes.flexEven}>
                            {
                                waitExecuteResponse
                                    ? <CircularProgress size={10} />
                                    : executeTimer
                                        ? <CircularProgressWithLabel size={27} value={timerValue} />
                                        : <SendIcon />
                            }
                        </Typography>
                    </Button>
                    <span>Execution time: {codeExecTime}ms</span>
                </div>
            </div>
            <div className={classes.editorContainer}>
                <AceEditor
                    className={classes.aceEditor}
                    mode={language}
                    theme={theme}
                    name="editor"
                    fontSize={fontSize}
                    editorProps={{
                        $blockScrolling: true
                    }}
                    onChange={onChangeCode}
                    value={code}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
                <div>
                    <AceEditor
                        className={classes.aceEditor}
                        mode="text"
                        style={{ color: outputColor }}
                        theme={theme}
                        name="output"
                        fontSize={fontSize + 2}
                        showPrintMargin={false}
                        showGutter={false}
                        highlightActiveLine={false}
                        value={results}
                        readOnly={true}
                        editorProps={{ $blockScrolling: true }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Editor;