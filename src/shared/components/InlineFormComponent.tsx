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
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsEditing(false);
                setFormValue("");
            }
        };

        if (isEditing) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

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

    const textareaStyle = {
        maxHeight: "120px",
        maxWidth: "180px",
        // fontSize: "16px",
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
                <form onSubmit={onSubmit}>
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
                            style={textareaStyle}
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
                    {/* {hasButton && (
                        <button
                            type="submit"
                            disabled={!formValue}
                            className="inline-form-button"
                            onSubmit={onSubmit}
                        >
                            {buttonText}
                        </button>
                    )} */}
                </form>
            )}
        </div>
    );
};

export default InlineFormComponent;
