import { useEffect } from 'react'
import { getSickData } from "../redux/actions/sick"
import { sickOpt } from "../redux/interfaces/sick"
import { useAppDispatch, useAppSelector } from "../redux/store/hooks"
import { Select, notification } from "antd"

const SickSelect = ({onChange}: any) => {
    const dispatch = useAppDispatch();

    const sickData = useAppSelector((state)=> state.sick.data)
    const sickDataError = useAppSelector((state)=> state.sick.error)
    const userData = useAppSelector((state)=> state.user.data)

    useEffect(()=> {

        if(!sickData && !sickDataError && userData?.token) {
            dispatch(getSickData());
        }
    }, [sickData, userData]);

    useEffect(()=> {

        if(sickDataError){
            notification.error({message: sickDataError.message});
        }
    }, [sickDataError]);
  

  return (
    <Select
        placeholder="Select a Sick Plan"
        allowClear
        onChange={(value) => onChange(value)}
    >
        {sickData && sickData.map((sickOpt: sickOpt) => <Select.Option key={sickOpt.id} value={sickOpt.id}>{sickOpt.name}</Select.Option>)}
    </Select>
  )
}

export default SickSelect
