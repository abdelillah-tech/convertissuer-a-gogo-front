import React, { useState, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import brace from 'brace';

import AceEditor from 'react-ace';
import PubSub from 'pubsub-js';
import alertType from '../common/AlertTypes';

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
import ExecuteService from '../api/Executor';
import { Typography } from '@material-ui/core';
import { Context } from "../common/Store";


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
}));

const Editor = () => {

    const themes = [
        'monokai',
        'github',
        'xcode',
        'terminal',
        'twilight',
    ]

    const langages = [
        'Javascript',
        'Python',
    ]

    const [theme, setTheme] = useState(themes[0]);

    const [langage, setLangage] = useState(langages[1]);

    const [fontSize, setFontSize] = useState(17);

    const [results, setResults] = useState(null);

    const [outputColor, setOutputColor] = useState('white')

    const [code, setCode] = useState('');

    const [state, dispatch] = useContext(Context);
    

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

    const onChange = (value) => {
        setCode(value)
    }

    const handleChangeTheme = (event) => {
        setTheme(event.target.value);
    }

    const handleChangeLangage = (event) => {
        setLangage(event.target.value);
    }

    const handleExecute = () => {
        ExecuteService.execute(langage, code, state.token)
            .then((response) => {
                if(!response.data.result.result.stderr){
                    console.log(JSON.stringify(response));
                    setResults(response.data.result.result.stdout)
                    setOutputColor("white")
                } else {
                    setResults(`${response.data.result.result.stdout}\n${response.data.result.result.stderr}`);
                    setOutputColor("red")
                }
            }).catch(e => {
                PubSub.publish('alert',{
                    alertType : alertType.error,
                    message : 'Sorry! Something went wrong. Please try again!'
                })
            });
    }

    const classes = useStyles();

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
                        <InputLabel id="langage-label">Langage</InputLabel>
                        <Select
                            labelId="langage-label"
                            id="langage"
                            value={langage}
                            onChange={handleChangeLangage}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            {langages.map((langage) => (
                                <MenuItem key={langage} value={langage}>
                                    {langage}
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
                        <Typography>Upload File</Typography>
                        <input
                            type="file"
                            hidden
                        />
                    </Button>

                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.formControl}
                        onClick={handleExecute}
                    >
                        <Typography>Execute</Typography>
                    </Button>
                </div>
            </div>
            <div className={classes.editorContainer}>
                <AceEditor
                    className={classes.aceEditor}
                    mode={langage.toLowerCase()}
                    theme={theme}
                    name="editor"
                    fontSize={fontSize}
                    editorProps={{
                        $blockScrolling: true
                    }}
                    onChange={onChange}
                    value={code}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
                <AceEditor
                    className={classes.aceEditor}
                    mode="text"
                    style={{color: outputColor}}
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
    );
}

export default Editor;