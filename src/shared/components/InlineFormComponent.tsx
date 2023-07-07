import React, { useState, useRef, useEffect } from "react";

interface InlineFormProps {
    title?: string;
    defaultText?: string;
    hasButton?: boolean;
    buttonText?: string;
    inputPlaceholder?: string;
    inputType?: "input" | "textarea";
    handleSubmit: (value: string) => void;
}

const InlineFormComponent: React.FC<InlineFormProps> = ({
    title = "",
    defaultText = "Not defined",
    hasButton = false,
    buttonText = "Submit",
    inputPlaceholder = "",
    inputType = "input",
    handleSubmit,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formValue, setFormValue] = useState("");
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const activeEditing = () => {
        setFormValue(title);
        setIsEditing(true);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (formValue) {
            handleSubmit(formValue);
        }
        setIsEditing(false);
        setFormValue("");
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            onSubmit(event);
        }
    };

    return (
        <div
            className={`inline-form-container ${
                isEditing ? "inline-form-container-editing" : ""
            }`}
            onClick={activeEditing}
        >
            {!isEditing && (
                <div className="inline-form-text">{defaultText}</div>
            )}
            {isEditing && (
                <form onSubmit={onSubmit} className="inline-form">
                    {inputType === "input" && (
                        <input
                            type="text"
                            value={formValue}
                            onChange={(event) =>
                                setFormValue(event.target.value)
                            }
                            className="input-form-input"
                            placeholder={inputPlaceholder}
                            onKeyDown={handleKeyDown}
                            ref={inputRef as React.RefObject<HTMLInputElement>}
                        />
                    )}
                    {inputType === "textarea" && (
                        <textarea
                            value={formValue}
                            onChange={(event) =>
                                setFormValue(event.target.value)
                            }
                            className="input-form-input"
                            onKeyDown={handleKeyDown}
                            ref={
                                inputRef as React.RefObject<HTMLTextAreaElement>
                            }
                        ></textarea>
                    )}
                    {hasButton && (
                        <button
                            type="submit"
                            disabled={!formValue}
                            className="inline-form-button"
                        >
                            {buttonText}
                        </button>
                    )}
                </form>
            )}
        </div>
    );
};

export default InlineFormComponent;
