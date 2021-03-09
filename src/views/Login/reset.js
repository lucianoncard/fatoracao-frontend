import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api';
import './login.css';
import fatoracao from '../../images/fatoracao.png';

export default function Reset() {

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  async function handleResetPassword(e){
    e.preventDefault();
    const data = { email, token, senha };

    try {
      const response = await api.post('auth/reset_password', data);
      alert ('Senha alterada com sucesso');
      history.push('/');
    } catch (err) {
      alert ('Falha no reset da senha! Tente novamente!');
    }
  }
  
  return (
    <>
      <Container>
        <Row>
          <Col>
            <img id="fatoracao" src={fatoracao} alt="Fatoração" />
          </Col>
          <Col>          
            <section className="form">
              <form onSubmit={handleResetPassword}>
                <span><strong>Alteração de senha:</strong></span>
                <input id="email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={e =>setEmail(e.target.value)}
                  required
                />
                <input id="token" 
                  placeholder="Token"
                  value={token}
                  onChange={e =>setToken(e.target.value)}
                  required
                />
                <input id="senha" 
                  type="password"
                  placeholder="Nova senha"
                  value={senha}
                  onChange={e =>setSenha(e.target.value)}
                  required
                />
                <button className="botao" type="submit">CONFIRMAR</button>
              </form>
            </section>          
          </Col>
        </Row>
      </Container>
    </>
  );
}