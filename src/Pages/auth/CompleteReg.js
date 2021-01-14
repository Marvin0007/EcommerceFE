import React, {useEffect, useReducer, useState} from 'react';
import { auth } from '../../Firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CompleteReg = ({history}) => {
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');


    useEffect(() => {
        setMail(window.localStorage.getItem('emailForRegistration'))
    }, []);


    // console.log("Mail:"+mail,"URL:"+window.location.href)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!pass || !mail){
            toast.error("Email and Password is Required");
            return;
        }
        if (pass.length<6){
            toast.error("Password must be at least 6 characters long!");
            return;
        }
        try{
            const result = await auth.signInWithEmailLink(mail, window.location.href);
            if(result.user.emailVerified) {
                // remove user email from local storage
                window.localStorage.removeItem('emailForRegistration');
                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(pass);
                const idTokenResult = await user.getIdToken();
                console.log('user:' + user + '\nID Token:' +idTokenResult);

                // populate redux store
                // redirect
                history.push("/");
            }
            console.log("Result:" + result);
            // history.push('/');

        } catch(err) {
            console.log(err);
            toast.error(err.message);
        }
    };


    const comRegForm = () => {
        const fetchMail = window.localStorage.getItem('emailForRegistration');
        return(
            <form className="form" onSubmit={handleSubmit}>
                <input type="email" className="form-control" value={mail} placeholder={fetchMail? fetchMail:"Email Address"} onChange={e=> setMail(e.target.value)} />
                <input type="pass" className="form-control" value={pass} placeholder="Password" onChange={e=> setPass(e.target.value)} autoFocus />
                <button className="btn btn-raised border">Complete Registration</button>
            </form>
        )
    };

    return(
        <div className="container p-5">
            <div className="row">
                <h4>Credentials:</h4>
                <ToastContainer />
                {comRegForm()}
            </div>
        </div>
    );
}

export default CompleteReg;