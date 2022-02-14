import React from 'react';
import { useSelector } from 'react-redux';
import HeaderComponent from '../home/header';
import EditForm from './editForm';

const AdminScreen = ()=>{

    const {token} = useSelector(state=>state.auth);

    return (
        <div className='admin-pane'>
            <HeaderComponent />
            <h1>Agregar productos</h1>
            <EditForm token={token}/>
        </div>
    );
}

export default AdminScreen;