import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { LOGIN_PATH } from "./../constants/login"
import { useAppSelector } from "../redux/store/hooks"


export default function useUser() {
  const router = useRouter();
  const userData = useAppSelector((state)=> state.user.data)

  useEffect(()=> {
    if(router.pathname !== LOGIN_PATH && !userData?.token) {
      Router.push(LOGIN_PATH);
    }
  }, [userData]);

  return { data: userData }
}