import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import brace from 'brace';

import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/java';
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
import { Typography } from '@material-ui/core';


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
        'javascript',
        'python',
        'java',
    ]

    const [theme, setTheme] = useState(themes[0]);

    const [langage, setLangage] = useState(langages[1]);

    const [fontSize, setFontSize] = useState(17);

    const [results, setResults] = useState(null);

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

    const handleChangeTheme = (event) => {
        setTheme(event.target.value);
    }

    const handleChangeLangage = (event) => {
        setLangage(event.target.value);
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
                    >
                        <Typography>Execute</Typography>
                </Button>
                </div>
            </div>
            <div className={classes.editorContainer}>
                <AceEditor
                    className={classes.aceEditor}
                    mode={langage}
                    theme={theme}
                    name="editor"
                    fontSize={fontSize}
                    editorProps={{
                        $blockScrolling: true
                    }}
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