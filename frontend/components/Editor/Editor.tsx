import React, { useEffect } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface EditorProps {
    handleChange: (blocks: OutputData['blocks']) => void;
}

export const Editor: React.FC<EditorProps> = ({handleChange}) => {

    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            placeholder: "Введите текст",
            async onChange() {
                const data = await editor.save();
                handleChange(data.blocks);
            }
        })

        return () => {
            editor.isReady.then(() => {
                editor.destroy()
            })
            .catch(e => console.error('ERROR editor cleanup', e));
        }

    }, [])

    return (
        <div>
            <div id="editor" />
        </div>
    )
}