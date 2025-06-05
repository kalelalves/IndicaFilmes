import { Button } from '../Button/Button';
import { TextField } from '../TextField/TextField';
import styles from './Login.module.css';

import React from 'react';

export const Login: React.FC = () => {
    return (
        <div className={styles.login}>
            <h1>Faça login na sua conta</h1>
            <TextField label="Email" placeholder="Digite seu email" value="" onChange={() => { }} />
            <TextField label="Senha" placeholder="Digite sua senha" value="" onChange={() => { }} />
            <Button>Entrar</Button>
        </div>
    );
};