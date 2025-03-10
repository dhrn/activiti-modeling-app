 /*!
 * @license
 * Copyright 2019 Alfresco, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Action } from '@ngrx/store';
import { ProcessEditorState, getInitialProcessEditorState } from './process-editor.state';
import {
    SELECT_MODELER_ELEMENT,
    SelectModelerElementAction,
    RemoveDiagramElementAction,
    REMOVE_DIAGRAM_ELEMENT,
    GET_PROCESS_ATTEMPT,
    GET_PROCESS_SUCCESS,
    UPDATE_PROCESS_SUCCESS,
    VALIDATE_PROCESS_ATTEMPT,
    UPDATE_PROCESS_ATTEMPT,
    SetLogHistoryVisibilityAction,
    SET_LOG_HISTORY_VISIBILITY,
    CLEAR_LOG_HISTORY,
    TOOLBAR_MESSAGE,
    ToolbarMessageAction,
    UPDATE_PROCESS_FAILED
} from './process-editor.actions';
import { OPEN_CONFIRM_DIALOG, LOG_ACTION, LogAction } from 'ama-sdk';
import { PROCESS_EDITOR_LOGS } from '../services/process-editor.constants';

export function processEditorReducer(
    state: ProcessEditorState = getInitialProcessEditorState(),
    action: Action
): ProcessEditorState {
    let newState: ProcessEditorState;

    switch (action.type) {
        case GET_PROCESS_ATTEMPT:
            newState = { ...state, loading: true };
            break;

        case GET_PROCESS_SUCCESS:
            newState = getInitialProcessEditorState();
            break;

        case SELECT_MODELER_ELEMENT:
            newState = setSelectedElement(state, <SelectModelerElementAction>action);
            break;

        case REMOVE_DIAGRAM_ELEMENT:
            return removeElement(state, <RemoveDiagramElementAction> action);

        case TOOLBAR_MESSAGE:
            return {
                ...state,
                toolbar: {
                    ...state.toolbar,
                    userMessage: (<ToolbarMessageAction>action).message
                }
            };

        case LOG_ACTION:
            return storeLog(state, <LogAction> action);

        case CLEAR_LOG_HISTORY:
            return {
                ...state,
                toolbar: {
                    ...state.toolbar,
                    logs: []
                }
            };

        case SET_LOG_HISTORY_VISIBILITY:
            return {
                ...state,
                toolbar: {
                    ...state.toolbar,
                    logHistoryVisible: (<SetLogHistoryVisibilityAction>action).visible
                }
            };

        case UPDATE_PROCESS_ATTEMPT:
        case VALIDATE_PROCESS_ATTEMPT:
            return {
                ...state,
                toolbar: {
                    ...state.toolbar,
                    inProgress: true
                }
            };

        case OPEN_CONFIRM_DIALOG:
        case UPDATE_PROCESS_SUCCESS:
            return {
                ...state,
                toolbar: {
                    ...state.toolbar,
                    inProgress: false
                }
            };

        case UPDATE_PROCESS_FAILED:
                return {
                    ...state,
                    toolbar: {
                        ...state.toolbar,
                        inProgress: false
                    }
                };

        default:
            newState = Object.assign({}, state);
    }

    return newState;
}

function storeLog(state: ProcessEditorState, action: LogAction): ProcessEditorState {
    if (action.log.initiator.key !== PROCESS_EDITOR_LOGS) {
        return state;
    }

    return {
        ...state,
        toolbar: {
            ...state.toolbar,
            logs: [
                action.log,
                ...state.toolbar.logs
            ]
        }
    };
}

function setSelectedElement(state: ProcessEditorState, action: SelectModelerElementAction): ProcessEditorState {
    return {
        ...state,
        selectedElement: action.element
    };
}

function removeElement(state: ProcessEditorState, action: RemoveDiagramElementAction): ProcessEditorState {
    if (state.selectedElement && state.selectedElement.id === action.element.id) {
        return {
            ...state,
            selectedElement: null,
            toolbar: {
                ...state.toolbar,
                userMessage: ''
            }
        };
    }

    return { ...state };
}
