import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import StudentQnaRegistrationCSS from "./StudentQnaRegistration.module.css";
import {callQnaRegsistAPI} from "../../api/StudentAPICalls";
import { callClassHistoryListForMemberNoPagingAPI } from '../../api/StudentAPICalls';
import StudentQnaDtailCSS from "./StudentQnaDetail.module.css";

function StudentQnaRegistration() {

    const classes = useSelector(state => state.studentQnaListReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    console.log(classes);
    console.log('classes.mtmCode', classes.mtmCode)

    useEffect(
        () => {
            dispatch(callClassHistoryListForMemberNoPagingAPI({
            }));
        }, []
    );

    const [ form, setForm ] = useState({
        classCode: 0,
        mtmCode : 0,
        mtmTitle : '',
        mtmDescription :'',
      

    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickQnaRegistrationHandler = () => {

        const formData = new FormData();
        formData.append("classCode", form.classCode);
        formData.append("mtmCode", form.mtmCode);
        formData.append("mtmTitle", form.mtmTitle);
        formData.append("mtmDescription", form.mtmDescription);

        dispatch(callQnaRegsistAPI({
            form : form,
            classCode : form.openClasses?.classCode,
        }));

        alert('상담이 등록 되었습니다.');  

        navigate(`/ono/student/studentQna`, {replace:false})
        window.location.reload();
    }

    return(
        
        <div>
           <div className={ StudentQnaRegistrationCSS.h2 }> 
            <h2>상담 등록</h2>
            <div className={ StudentQnaRegistrationCSS.qnaSection }>
                <div className={ StudentQnaRegistrationCSS.qnaInfoDiv }>
              
                    <table>
                    { Array.isArray(classes) && (
                        <tbody>
                            <tr>
                                <th><label>과목명</label></th>
                                <td>
                                    <select
                                        id="classList"
                                        name='classCode'
                                        placeholder='과목명'
                                        className={StudentQnaRegistrationCSS.qnaInfoInput}
                                        onChange={onChangeHandler}
                                    >
                                        <option>과목명</option>
                                    {classes.map((item,idx) => (
                                    <option key={idx} name='classCode' value={item?.openClasses?.classCode} >
                                      {item?.openClasses?.className}
                                    </option>
                                  ))}
                                    </select>
                                </td>
                            </tr>
                               <tr>
                                   <th>제목</th>
                                   <td>
                                       <input 
                                           name='mtmTitle'
                                           placeholder='제목을 입력하세요.'
                                           className={ StudentQnaRegistrationCSS.qnaInfoInput }
                                           onChange={ onChangeHandler }
                                       />
                                   </td>
                               </tr>
                               <tr>
                                   <th>내용</th>
                                   <td>
                                       <textarea 
                                           name='mtmDescription'
                                           placeholder='내용을 입력하세요.'
                                           className={ StudentQnaRegistrationCSS.qnaInfoInput }
                                           onChange={ onChangeHandler }
                                        
                                       />
                                   </td>
                                </tr>
                                
                        </tbody>)}                        
                    </table>
                    
                </div>
                </div>
            </div>
            <div className={StudentQnaDtailCSS.subjectButtonDiv}    >
                <br></br>
                <button
                    
                    className={StudentQnaDtailCSS.backBtn}        
                    onClick={ () => navigate(-1) }            
                >
                    취소
                </button>
                <button       
                    className={StudentQnaDtailCSS.registBtn}
                    onClick={ onClickQnaRegistrationHandler }             
                >
                    등록
                </button>
               
            </div>        
        </div>

        
    
    );

    
}
export default StudentQnaRegistration;