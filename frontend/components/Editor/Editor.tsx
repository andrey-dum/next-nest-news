import React, { useEffect } from 'react';
import EditorJS, { OutputBlockData, OutputData } from '@editorjs/editorjs';

interface EditorProps {
    handleChange: (blocks: OutputBlockData<string, any>[]) => void;
    initialBlocks: OutputBlockData[]

}

export const Editor: React.FC<EditorProps> = ({ handleChange, initialBlocks }) => {

    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            data: {
                blocks: initialBlocks
            },
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