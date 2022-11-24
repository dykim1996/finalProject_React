import ClassManagementCSS from './ClassManagement.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callClassUpdateAPI } from '../../api/ClassAPICalls';
import { callClassDetailForAdminAPI } from '../../api/ClassAPICalls';

function ClassUpdate(){

    const params = useParams();
    const classDetail = useSelector(state => state.classReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(()=> {
        dispatch(callClassDetailForAdminAPI({
            classCode : params.classCode
        }));
    }, []);


    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

   
    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            memberName : classDetail.member.memberName,
            subjectName : classDetail.subject.subjectName,
            classCode : classDetail.classCode,
            className : classDetail.className,
            classQuota : classDetail.classQuota,
            classPrice : classDetail.classPrice,
            classStartDate: classDetail.classStartDate,
            classEndDate : classDetail.classEndDate,
            classRoom : classDetail.classRoom,
            classDescription : classDetail.classDescription,
            classCircuit : classDetail.classCircuit,
            classesScheduleList : classDetail.classesScheduleList
        });
    }

    /* 상품 수정 저장 버튼 클릭 이벤트 */
    const onClickClassUpdateHandler = () => {

        const formData = new FormData();
        formData.append("memberName", form.memberName)
        formData.append("classCode", form.classCode);
        formData.append("subjectForm", form.subjectForm);
        formData.append("subjectLanguage", form.subjectLanguage);
        formData.append("subjectBook", form.subjectBook);
        formData.append("subjectDescription", form.subjectDescription);

        dispatch(callSubjectUpdateAPI({
            form : formData
        }));
        alert('과목이 수정되었습니다.');
        navigate('/ono/OpenClasses/subjects', { replace : true });
    }

    return (
        <div>
            <div>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            {!modifyMode &&
                <button 
                    onClick={ onClickModifyModeHandler }
                >
                    수정 모드
                </button>
            }
            {modifyMode &&
                <button 
                    onClick={ onClickSubjectUpdateHandler }
                >
                    과목 수정 저장하기
                </button>
            }
            </div>        
            <div className={ SubjectRegistrationCSS.subjectSection }>
                <div className={ SubjectRegistrationCSS.subjectInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>과목명</label></td>
                                <td>
                                    <input 
                                        name='subjectName'
                                        placeholder='과목명'
                                        className={ SubjectRegistrationCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? subjectDetail.subjectName : form.subjectName) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>수업 형태</label></td>
                                <td>
                                    <input 
                                        name='subjectForm'
                                        placeholder='수업 형태'
                                        className={ SubjectRegistrationCSS.subjectInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? subjectDetail.subjectForm : form.subjectForm) || 0 }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>언어</label></td>
                                <td>
                                    <label>
                                        <input 
                                            name="subjectLanguage"  
                                            placeholder='언어'
                                            className={ SubjectRegistrationCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? subjectDetail.subjectLanguage : form.subjectLanguage) || 0 }
                                            readOnly={ modifyMode ? false : true }
                                            style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>교재</label></td>
                                <td>
                                    <label>
                                        <input 
                                            name="subjectBook"  
                                            placeholder='교재'
                                            className={ SubjectRegistrationCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? subjectDetail.subjectBook : form.subjectBook) || 0 }
                                            readOnly={ modifyMode ? false : true }
                                            style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>과목 설명</label></td>
                                <td>
                                    <label>
                                        <input 
                                            name="subjectDescription"  
                                            placeholder='과목 설명'
                                            className={ SubjectRegistrationCSS.subjectInfoInput }
                                            onChange={ onChangeHandler } 
                                            value={ (!modifyMode ? subjectDetail.subjectDescription : form.subjectDescription) || 0 }
                                            readOnly={ modifyMode ? false : true }
                                            style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                            /> 
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>과목 학습 목표</label></td>
                                <td>
                                    <textarea 
                                        className={ SubjectRegistrationCSS.textAreaStyle }
                                        name='subjectLearningObjectives'
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? subjectDetail.subjectLearningObjectives : form.subjectLearningObjectives) || 0 }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    ></textarea>
                                </td>
                            </tr> 
                    
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    );

}

export default ClassUpdate;