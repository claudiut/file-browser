import React, {
    ChangeEvent, FormEvent, useState,
} from 'react';
import { Button, TextField } from '@material-ui/core';

interface Props {
    value: string
    onSave: (fieldValue: string) => void
    onCancel: () => void
    className?: string
}

const defaultProps = {
    className: 'pr2 mb0',
};

const DEFAULT_VALUE = '';

const TextFieldForm = ({
    value = DEFAULT_VALUE, onSave, onCancel, className,
}: Props): JSX.Element => {
    const [fieldValue, setValue] = useState(value);

    const handleEdit = ({ target: { value: val } }: ChangeEvent<HTMLInputElement>) => setValue(val);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onSave(fieldValue);
    };

    const handleCancel = (e: FormEvent) => {
        e.stopPropagation();
        setValue(DEFAULT_VALUE);
        onCancel();
    };

    return (
        <form className={`flex items-center ${className}`} onSubmit={handleSubmit}>
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <TextField
                className="flex-auto"
                type="text"
                autoFocus
                value={fieldValue}
                onChange={handleEdit}
                onClick={(e) => e.stopPropagation()}
            />
            <div className="mh2">
                <Button onClick={handleCancel}>Cancel</Button>
            </div>
            <Button type="submit" variant="contained" color="primary" onClick={(e) => e.stopPropagation()}>Save</Button>
        </form>
    );
};

TextFieldForm.defaultProps = defaultProps;

export default TextFieldForm;
