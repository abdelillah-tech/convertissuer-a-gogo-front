import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import PubSub from 'pubsub-js';
import alertType from '../../common/AlertTypes';
import pubMessage from '../../common/MessagePublisher';


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
import PrivateFileService from '../../api/PrivateFile';
import FileUploadService from '../../api/FileUpload';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import { Context } from "../../common/Store";
import { CircularProgressWithLabel } from "../../common/CircularProgressWithLabel"
import CircularProgress from '@material-ui/core/CircularProgress';
import { CODE_EXEC_COOLDOWN } from "../../constants"
import SavedCodeMenu from './SavedCodeMenu';
import SaveCodeDialog from './SaveCodeDialog';
import CodeSaveService from '../../api/CodeSave';
import { BorderVerticalRounded } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    editorContainer: {
        display: 'flex',
    },
    inputs: {
        display: 'flex',
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    
    inputsBetween: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
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

    flexFile: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    flexFileBtn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    menu: {
        display: "flex"
    },

    menuItem: {
        justifyContent: "space-between",
    },
    iconButton: {
        color: "red"
    },
    menuItemClick: {
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    greyout: {
        color: "#BBBBBB"
    },
    editorTitle: {
        color: "white",
        backgroundColor: "#2f3129",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        padding: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        whiteSpace: "nowrap",
        height: "40px"
    },
    editorItemContainer: {
        margin: "5px",
        display: "flex",
        flexDirection: "column",
        
    },
    aceEditor: {       
        borderTop: "2px solid #ff8C00",
        display: "flex",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
    }
}));

const Editor = () => {

    const [state, dispatch] = useContext(Context);

    const [currentFile, setCurrentFile] = useState(state.selectedFile);

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

const startup = new Map();
startup.set('javascript', {code: 'const run = async (hex_buffer) => {\n\tconsole.log(hex_buffer);\n\treturn hex_buffer\n}'})
startup.set('python', {code: 'def run(hex_data):\n\tprint(hex_data)\n\treturn hex_data'})

    const [theme, setTheme] = useState(themes[0]);

    const [language, setLanguage] = useState(localStorage.getItem("language") || languages[1]);

    const [fontSize, setFontSize] = useState(16);

    const [results, setResults] = useState(null);

    const [codeExecTime, setCodeExecTime] = useState(0);

    const [waitExecuteResponse, setWaitExecuteResponse] = useState(false);
    const [executeTimer, setExecuteTimer] = useState(false);
    const [timerValue, setTimerValue] = useState(0);

    const [waitUploadResponse, setWaitUploadResponse] = useState(false);
    
    const [hideDebug, setHideDebug] = useState(false);

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
        let currentCode = code
        code.code = value
        setCode(code)
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
        setCurrentFile(event.target.value);
        dispatch({
            type: "SELECT",
            payload: event.target.value
        })
    }

    const componentWillMount = () =>{
        getFiles()
    }

    const handleUploadFile = (event) => {
        setWaitUploadResponse(true);
        const data = new FormData()
        data.append('file', event.target.files[0])
        FileUploadService.upload(data, state.token)
            .then((response) => {

                getFiles()
                pubMessage( undefined , 'File uploaded!', alertType.success)
                PubSub.publish('alert', {
                    alertType: alertType.success,
                    message: 'File uploaded!'
                })
                setWaitUploadResponse(false)
            }).catch(e => {
                setWaitUploadResponse(false)
                pubMessage(e, 'Sorry! We cannot upload your file. Please try again!')
            })
    }

    const handleExecute = () => {
        setWaitExecuteResponse(true)
        ExecuteService.execute(language, code.code, currentFile, state.token)
            .then((response) => {
                if (!response.data.result.result.stderr) {
                    setResults(response.data.result.result.stdout)
                    setCodeExecTime(response.data.result.result.executionTime)
                    setOutputColor("white")
                    if(response.data.result.result.resultKey){
                        PrivateFileService.urlFromKey(response.data.result.result.resultKey, state.token).then((response) => {
                            dispatch({
                                type: "RESULT_FILE",
                                payload: response.data
                            })
                        })
                    }
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
                pubMessage(e, 'Sorry! Something went wrong. Please try again!', alertType.error)
            });
    }

    const getFiles = () => {
        FileUploadService.getFiles(state.token)
            .then((response) => {
                dispatch({
                    type: "FILES",
                    payload: response.data
                })
            }).catch(e => {
                pubMessage(e, 'Sorry! We cannot load your files for the moment', alertType.error)
            })
    }

    const sendCodeToEditor = (codeFromMenu) => {
        console.log(codeFromMenu);
        if(!codeFromMenu.name){
            setCode(startup.get(language))

        } else {
            setCode(codeFromMenu)
        }
    }

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

    const handleDeleteFile = (file) => {
        FileUploadService.deleteFile(file.key, state.token)
            .then((response) => {
                console.log(response);
            }).catch(e => {
                pubMessage(e, 'Error in delete file', alertType.error)
            })
    }

    const handleDeleteCode = (id) => {
        CodeSaveService.deleteCode(id, state.token)
            .then((response) => {
                console.log(response.data.name)
                dispatch({
                    type: "CODES",
                    payload: state.codesList.filter(code => code.id !== id)
                })
                pubMessage(undefined, `Code ${response.data.name} delted successfuly`, alertType.success)
            }).catch(e => {
                pubMessage(undefined, 'Sorry! We cannot delete this code for the moment', alertType.error)
            })

        
    }

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.inputsBetween}>
                <div className={classes.inputs}>
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

                    <FormControl className={classes.formControl}>
                        <InputLabel id="file-label">Files</InputLabel>
                        <Select
                            labelId="file-label"
                            id="file"
                            value={currentFile}
                            onChange={handleChangeFile}
                            input={<Input />}
                            MenuProps={MenuProps}
                            className={classes.menu}
                        >
                            {state.filesList.map((file) => (
                                <MenuItem key={file.name} value={file} className={classes.menuItem, classes.flexBetween}>
                                    {file.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {
                    currentFile.id
                        ? 
                        <div className={classes.flexEven}>
                            <Button 
                                aria-label="delete" 
                                className={classes.iconButton}
                                onClick={() => handleDeleteFile(currentFile)}>
                                Delete file
                            </Button>   
                        </div>
                        : ""
                    }

                </div>
                <div className={classes.inputs}>

                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        className={classes.formControl}
                    >
                        {
                            waitUploadResponse
                                ? <CircularProgress />
                                : <div className={classes.inputs}><CloudUploadIcon></CloudUploadIcon>&nbsp;file</div>
                        }
                        <input
                            type="file"
                            onChange={handleUploadFile}
                            hidden
                        />
                    </Button>

                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.formControl}
                        disabled={waitExecuteResponse || executeTimer || !currentFile.id}
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
                    <span>
                        Execution time:&nbsp;
                        {
                            waitExecuteResponse
                                ? <CircularProgress />
                                : `${codeExecTime}ms`
                        }

                    </span>
                </div>
            </div>
            <div className={classes.editorContainer}>
                <div className={classes.editorItemContainer} style={{ flex: hideDebug ? "6" : "1"}}>
                    <div className={classes.editorTitle}>

                        <span className={classes.inputs}>
                            <SavedCodeMenu
                                className={classes.formControl}
                                sendCodeToEditor={sendCodeToEditor} />
                            {code.name ? `"${code.name}"` : "Default"}
                        </span>
                        
                        <SaveCodeDialog code={code.code}/>
                    </div>

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
                        value={code.code}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                        width={"100%"}

                    />
                </div>
                <div className={classes.editorItemContainer} style={{ flex: "1"}}>
                    <div className={classes.editorTitle}>
                        <span>
                            Debug output
                        </span>
                        { 
                        hideDebug 
                            ? <IconButton color="primary" onClick={() => setHideDebug(false)}><ArrowRightIcon></ArrowRightIcon></IconButton>
                            : <IconButton color="primary" onClick={() => setHideDebug(true)}><ArrowLeftIcon></ArrowLeftIcon></IconButton> 
                        }
                    </div>

                        <AceEditor
                            className={classes.aceEditor}
                            mode="text"
                            style={{ 
                                color: outputColor
                            }}
                            width={"100%"}
                            height={"100%"}
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