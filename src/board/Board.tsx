import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as socketService from "../shared/services/socket.service";
import { SocketEventsEnum } from "../shared/types/socketEvents.enum";
import * as boardService from "../shared/services/board.service";
import * as boardsService from "../shared/services/boards.service";
import * as columnService from "../shared/services/columns.service";
import * as tasksService from "../shared/services/tasks.service";
import {
    selectCurrentTask,
    setCurrentTask,
    updateTask,
    selectBoard,
    selectColumns,
    changeColumnName,
    selectTasks,
    setBoard,
    setColumns,
    createColumn,
    deleteColumn,
    setTasks,
    createTask,
    deleteTask,
    setDeletedTaskID,
    selectDeletedTaskID,
} from "../boardSlice";
import { useSelector, useDispatch } from "react-redux";
import InlineFormComponent from "../shared/components/InlineFormComponent";
import { BoardInterface } from "../shared/types/board.interface";
import { ColumnInterface } from "../shared/types/column.interface";
import { TaskInterface } from "../shared/types/task.interface";
import classes from "./Board.module.css";
// import modalCls from "./TaskDialog.module.css";
import flexCls from "./TaskDialogFlex.module.css";
import { ColumnInputInterface } from "../shared/types/columnInput.interface";
import { TaskInputInterface } from "../shared/types/taskInput.interface";
// icons :css.gg
import { CgClose, CgCornerUpLeft, CgTrash } from "react-icons/cg";
import ModalDialog from "./CustomDialog";
export const Board = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const board = useSelector(selectBoard);
    const columns = useSelector(selectColumns);
    const tasks = useSelector(selectTasks);
    const currentTask = useSelector(selectCurrentTask);
    const deletedTaskID = useSelector(selectDeletedTaskID);
    const navigate = useNavigate();
    const optionRef = useRef<HTMLSelectElement>(null);

    //compoenent Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // const openModal = () => {
    //     setIsModalOpen(true);
    // };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleShowModalComponent = (currentTask: TaskInterface) => {
        dispatch(setCurrentTask(currentTask));
        setIsModalOpen(true);
        console.log("handleShowModalComponent:", currentTask);
    };
    /*************** */

    // #region Task Dialog Functions

    // const handleShowDialog = (currentTask: TaskInterface) => {
    //     dispatch(setCurrentTask(currentTask));
    //     const favDialog = document.getElementById(
    //         "favDialog"
    //     ) as HTMLDialogElement;
    //     favDialog.showModal();
    // };

    // const handleSelectChange = (
    //     event: React.ChangeEvent<HTMLSelectElement>
    // ) => {
    //     const confirmBtn = document.getElementById(
    //         "confirmBtn"
    //     ) as HTMLButtonElement;
    //     confirmBtn.value = event.target.value;
    // };

    const handleOptionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedOption = event.target.value;
        // Do something with the selected option value
        console.log(selectedOption);
        tasksService.updateTask(boardId, currentTask!.id, {
            columnId: selectedOption,
        });
    };

    // const handleConfirmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    //     const favDialog = document.getElementById(
    //         "favDialog"
    //     ) as HTMLDialogElement;
    //     const selectEl = favDialog.querySelector("select") as HTMLSelectElement;
    //     favDialog.close(selectEl.value);
    // };
    // #endregion

    const getTasksByColumn = (
        columnId: string,
        tasks: TaskInterface[]
    ): TaskInterface[] => {
        return tasks.filter((task) => task.columnId === columnId);
    };

    const updateBoardName = (boardName: string) => {
        boardsService.updateBoard(boardId, { title: boardName });
    };

    const handleCreateColumn = (title: string) => {
        const columnInput: ColumnInputInterface = {
            title,
            boardId: boardId,
        };
        columnService.createColumn(columnInput);
    };

    const updateColumnName = (columnId: string, columnName: string) => {
        columnService.updateColumn(boardId, columnId, { title: columnName });
    };

    const handleUpdateTaskName = (taskName: string) => {
        tasksService.updateTask(boardId, currentTask!.id, { title: taskName });
    };

    const handleUpdateTaskDescription = (Description: string) => {
        console.log("handleUpdateTaskDescription:", Description);
        tasksService.updateTask(boardId, currentTask!.id, {
            description: Description,
        });
    };

    const deleteBoard = () => {
        // if (confirm("Are you sure you want to delete this board?")) {
        if (
            window.confirm(
                "Are you sure you want to delete this board ?\nAll columns and tasks will be deleted."
            )
        ) {
            boardsService.deleteBoard(boardId);
        }
    };

    const boardsUpdateSuccess = (board: BoardInterface) => {
        dispatch(setBoard(board));
    };

    const columnsCreateSuccess = (column: ColumnInterface) => {
        dispatch(createColumn(column));
    };
    const tasksCreateSuccess = (task: TaskInterface) => {
        dispatch(createTask(task));
    };

    const columnUpdateSuccess = (column: ColumnInterface) => {
        dispatch(changeColumnName(column));
    };

    const taskUpdateSuccess = (task: TaskInterface) => {
        console.log("taskUpdateSuccess", task);
        dispatch(updateTask(task));
    };

    const columnDeleteSuccess = (columnId: string) => {
        dispatch(deleteColumn(columnId));
        console.log("columnDeleteSuccess", columnId);
    };

    const boardsDeleteSuccess = (boardId: string) => {
        console.log("boardsDeleteSuccess", boardId);
        dispatch(setBoard(null));
        navigate("/boards");
    };

    const handleDeleteColumn = (columnId: string) => {
        if (window.confirm("Are you sure you want to delete this column?")) {
            columnService.deleteColumn(boardId, columnId);
        }
    };

    const handleDeleteTask = (taskId: string | undefined) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            tasksService.deleteTask(boardId, taskId);
            setIsModalOpen(false);
        }
    };

    const DeleteTaskSuccess = (taskId: string) => {
        dispatch(deleteTask(taskId));
        dispatch(setDeletedTaskID(taskId));
    };

    const handleCreateTask = (columnId: string, title: string) => {
        const taskInput: TaskInputInterface = {
            title,
            columnId,
            boardId,
        };
        tasksService.createTask(taskInput);
    };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    // };

    function fetchData(): void {
        boardsService
            .getBoard(boardId)
            .then((board) => {
                console.log("board:", board);
                dispatch(setBoard(board));
            })
            .catch((error) => {
                console.error("Error fetching board:", error);
            });
        columnService
            .getColumns(boardId)
            .then((columns) => {
                console.log("columns:", columns);
                dispatch(setColumns(columns));
            })
            .catch((error) => {
                console.error("Error fetching columns:", error);
            });
        tasksService
            .getTasks(boardId)
            .then((tasks) => {
                console.log("tasks:", tasks);
                dispatch(setTasks(tasks));
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    }
    useEffect(() => {
        if (currentTask) {
            // const taskSelect = document.getElementById(
            //     "task_select"
            // ) as HTMLSelectElement;
            // taskSelect.value = currentTask!.columnId;
            if (optionRef.current) {
                optionRef.current.value = currentTask!.columnId;
            }
            /**************** */
            dispatch(setCurrentTask(currentTask));
            console.log("useEffect_currentTask ID :", currentTask?.id);
            console.log("deletedTaskID :", deletedTaskID);
        }
        if (currentTask?.id === deletedTaskID) {
            setIsModalOpen(false);
        }
    }, [currentTask, deletedTaskID]);

    useEffect(() => {
        socketService.emit(SocketEventsEnum.boardsJoin, { boardId });
        fetchData();
        socketService.listen(
            SocketEventsEnum.boardsUpdateSuccess,
            boardsUpdateSuccess
        );
        socketService.listen(
            SocketEventsEnum.boardsUpdateFailure,
            (error: string) => {
                console.error("boardsUpdateFailure", error);
            }
        );
        socketService.listen(
            SocketEventsEnum.boardsDeleteSuccess,
            boardsDeleteSuccess
        );
        socketService.listen(
            SocketEventsEnum.columnsUpdateSuccess,
            columnUpdateSuccess
        );
        socketService.listen(
            SocketEventsEnum.columnsDeleteSuccess,
            columnDeleteSuccess
        );
        socketService.listen(
            SocketEventsEnum.columnsCreateSuccess,
            columnsCreateSuccess
        );
        socketService.listen(
            SocketEventsEnum.tasksCreateSuccess,
            tasksCreateSuccess
        );

        socketService.listen(
            SocketEventsEnum.tasksUpdateSuccess,
            taskUpdateSuccess
        );

        socketService.listen(
            SocketEventsEnum.tasksDeleteSuccess,
            DeleteTaskSuccess
        );

        return () => {
            console.log("leaving__board");
            console.log("board_id", boardId);
            boardService.leaveBoard(boardId);
            dispatch(setBoard(null));
            socketService.socketRemoveAllListeners();
        };
    }, []);

    return (
        <>
            {board && (
                <div className="board">
                    <div className={classes.board_header_container}>
                        <InlineFormComponent
                            defaultText={board.title}
                            title={board.title}
                            handleSubmit={updateBoardName}
                        />

                        <CgTrash
                            className={classes.css_gg_icon}
                            onClick={deleteBoard}
                        />
                        <CgCornerUpLeft
                            className={classes.css_gg_icon}
                            onClick={() => navigate("/boards")}
                        />
                    </div>

                    <div className={classes.columns}>
                        {columns &&
                            columns.length > 0 &&
                            columns.map((column) => (
                                <div className={classes.column} key={column.id}>
                                    <div className={classes.column_title}>
                                        <InlineFormComponent
                                            defaultText={column.title}
                                            title={column.title}
                                            handleSubmit={(columnName) =>
                                                updateColumnName(
                                                    column.id,
                                                    columnName
                                                )
                                            }
                                        />

                                        <CgTrash
                                            className={classes.css_gg_icon}
                                            onClick={() =>
                                                handleDeleteColumn(column.id)
                                            }
                                        />
                                    </div>

                                    <div>
                                        {getTasksByColumn(
                                            column.id,
                                            tasks ?? []
                                        ).map((task) => (
                                            <div
                                                className={classes.task}
                                                key={task.id}
                                                onClick={() =>
                                                    handleShowModalComponent(
                                                        task
                                                    )
                                                }
                                            >
                                                {task.title}
                                            </div>
                                        ))}

                                        <InlineFormComponent
                                            defaultText="Add new task"
                                            handleSubmit={(taskName) =>
                                                handleCreateTask(
                                                    column.id,
                                                    taskName
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        <div className={classes.column}>
                            <InlineFormComponent
                                defaultText="Create new column"
                                handleSubmit={handleCreateColumn}
                            />
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <ModalDialog onClose={closeModal}>
                    <div className={flexCls.flex_container}>
                        <div className={flexCls.first_row}>
                            <InlineFormComponent
                                defaultText={currentTask?.title}
                                title={currentTask?.title}
                                handleSubmit={handleUpdateTaskName}
                            />
                            <CgTrash
                                className={`${flexCls.icon_trash} ${flexCls.icon}`}
                                onClick={() =>
                                    handleDeleteTask(currentTask?.id)
                                }
                            />

                            <CgClose
                                className={flexCls.icon}
                                // onClick={handleCloseModal}
                                onClick={() => setIsModalOpen(false)}
                            />
                        </div>
                        <div className={flexCls.second_row}>
                            <p className={flexCls.des_label}>Description:</p>
                            <select
                                onChange={handleOptionChange}
                                id="task_select"
                                className={flexCls.option}
                                ref={optionRef}
                            >
                                {columns?.map((column) => (
                                    <option value={column.id} key={column.id}>
                                        {column.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={flexCls.third_row}>
                            <div className={flexCls.des_container}>
                                <InlineFormComponent
                                    defaultText={
                                        currentTask?.description ||
                                        "Add more detailed description"
                                    }
                                    title={currentTask?.description}
                                    inputType="textarea"
                                    hasButton
                                    buttonText="Save"
                                    handleSubmit={handleUpdateTaskDescription}
                                />
                            </div>
                            {/* <p className={modalCls.task_id}>{currentTask?.id}</p> */}
                        </div>
                    </div>
                </ModalDialog>
            )}
        </>
    );
};
