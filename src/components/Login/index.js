import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const { Title } = Typography;


const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {


    const handleLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
        // console.log(data);

        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
            })
        }
    }


    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3} >
                        Fun chat
                    </Title>
                    <Button
                        style={{ width: '100%', marginBottom: 5 }}
                        onClick={() => handleLogin(googleProvider)}
                    >
                        Đăng nhập bằng gg
                    </Button>
                    <Button
                        onClick={() => { handleLogin(fbProvider) }}
                        style={{ width: '100%', marginBottom: 5 }}>
                        Đăng nhập bằng fabbok
                    </Button>
                </Col>
            </Row>

        </div>
    )
}