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

export const DECISION_TASK_IMPLEMENTATION = 'dmn-connector.EXECUTE_TABLE';
export const DECISION_TABLE_INPUT_PARAM_NAME = '_activiti_dmn_table_';

export enum BpmnElement {
    Process = 'bpmn:Process',
    IntermediateCatchEvent = 'bpmn:IntermediateCatchEvent',
    IntermediateThrowEvent = 'bpmn:IntermediateThrowEvent',
    StartEvent = 'bpmn:StartEvent',
    EndEvent = 'bpmn:EndEvent',
    BoundaryEvent = 'bpmn:BoundaryEvent',
    SequenceFlow = 'bpmn:SequenceFlow',
    ExclusiveGateway = 'bpmn:ExclusiveGateway',
    ParallelGateway = 'bpmn:ParallelGateway',
    ServiceTask = 'bpmn:ServiceTask',
    UserTask = 'bpmn:UserTask',
    CallActivity = 'bpmn:CallActivity',
    SubProcess= 'bpmn:SubProcess'
}
