import { useNavigate, useParams } from "react-router-dom"
import { getDataWithToken, postDataWithToken, putData } from "../../../functions"
import { useEffect, useState } from "react"


const Rate = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [grade, setGrade] = useState([])
    const [gradeId, setGradeId] = useState(0)
    const [description, setDescription] = useState('')

    useEffect(()=>{
        getDataWithToken('/delivery/grade_delivery').
        then((res)=>setGrade(res))
    },[])

    console.log(description);

    const putId = (e) => {
        e.preventDefault()
        const statusId = {
            is_active : true
        }

        const total_grade = {
            decription : description,
            grade : gradeId,
            delivery : id
        }

        postDataWithToken(total_grade,`/delivery/order_commnet`)

        putData(statusId, `/delivery/deteile_order/${id}`).
        then(()=>navigate('/home/my-order'))
      }

      const postGrade = (id) => {
        setGradeId(id)
      }

    return (
        <div className="d-flex flex-column justify-content-between align-items-center w-100">
            <form onSubmit={putId}>
            <div className="d-flex justify-content-center align-items-center w-100 gap-2 mb-2">
                {
                    grade.map(item=>
                        <button type="button" onClick={(e)=>postGrade(item.id)} className="rating"><i class="fa-regular fa-star"></i></button>
                    )
                }
                
            </div>
            <textarea onChange={(e)=>setDescription(e.target.value)} className="form-control w-100 mb-2" name="" id="" cols="30" rows="10"></textarea>
            <button className="btn btn-primary">send</button>
            </form>
        </div>
    )
}

export default Rate