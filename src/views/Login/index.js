import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import GoogleLogin from 'react-google-login';

import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api';
import './login.css';
import fatoracao from '../../images/fatoracao.png';

const responseGoogle = (response) => {
  localStorage.setItem('aluno_nome', response.profileObj.name);
  localStorage.setItem('aluno_email', response.profileObj.email);
  if (response.profileObj.name !== undefined) window.location.href = "https://fatoracao-frontend.herokuapp.com/home";
}

export default function Login() {

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();
    const data = { email, senha };

    try {
      const response = await api.post('auth/authenticate', data);
      localStorage.setItem('aluno_nome', response.data.user.nome);
      localStorage.setItem('aluno_email', response.data.user.email);
      localStorage.setItem('aluno_celular', response.data.user.celular);
      localStorage.setItem('aluno_cidade', response.data.user.cidade);
      localStorage.setItem('aluno_estado', response.data.user.estado);
      localStorage.setItem('aluno_id', response.data.user._id);
      localStorage.setItem('token', 'Bearer ' + response.data.token);
      history.push('/home');
    } catch (err) {
      alert ('Falha de login! Tente novamente!');
    }
  }

  async function handleCadastro(e){
    e.preventDefault();
    const data = {
      nome, email, celular, cidade, estado, senha
    };
    
    try {
      const response = await api.post('auth/register', data);
      alert ('Cadastro realizado com sucesso!');
      handleClose2();
    } catch (err) {
      alert ('Erro no cadastro! Tente novamente!');
    }
  }

  async function handleForgotPassword(e){
    e.preventDefault();
    const data = { email };

    try {
      const response = await api.post('auth/forgot_password', data);
      alert ('Verifique sua caixa de entrada!');
      handleClose1();      
    } catch (err) {
      alert ('Falha de recuperação de senha! Tente novamente!');
    }
  }
  
  return (
    <>
    <div id = "tela">
      <Container>
        <Row>
          <Col>
            <img id="fatoracao_login" src={fatoracao} />
          </Col>
          <Col>
            <section className="form">
              <form onSubmit={handleLogin}>
                <input id="email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={e =>setEmail(e.target.value)}
                  autoComplete="off"
                  required
                />
                <input id="senha" 
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={e =>setSenha(e.target.value)}
                  required
                />
                <button className="botao" type="submit">ENTRAR</button>
              </form>
                <div id="esqueci_cadastro">
                  <div id="esqueci">
                    <a href="#" variant="primary" onClick={handleShow1}>Esqueci minha senha</a>
                  </div>
                  <div id="cadastro">
                    <a href="#" variant="primary" onClick={handleShow2}>Cadastra-se</a>
                  </div>
                </div>
                <div id="login">
                  <div>
                    ou
                  </div>
                  <div>
                    <GoogleLogin
                      clientId="388123972863-naonosl32ekbmom0gl3gs0rp7p1tm2q1.apps.googleusercontent.com"
                      render={renderProps => (
                        <button className="btnGoogle" onClick={renderProps.onClick} disabled={renderProps.disabled}>Entrar com Google</button>
                      )}
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                  </div>
                </div>
            </section>          
          </Col>
        </Row>
      </Container>
      <Modal backdrop="static" show={show1} onHide={handleClose1} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>Digite seu email para recuperar senha:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleForgotPassword}>
            <input id="email_senha"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e =>setEmail(e.target.value)}
              autoComplete="off"
              required
            />
            <Button className="botao" variant="secondary" type="submit">Enviar</Button>
            <Button className="botao" variant="secondary" onClick={handleClose1}>Fechar</Button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal backdrop="static" show={show2} onHide={handleClose2} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>Formulário de cadastro:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCadastro}>
            <input id="nome_cadastro"
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={e =>setNome(e.target.value)}
              autoComplete="off"
              required
            />
            <input id="email_cadastro"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e =>setEmail(e.target.value)}
              autoComplete="off"
              required
            />
            <MaskedInput id="celular"
              mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              placeholder="Celular"
              value={celular}
              onChange={e => setCelular(e.target.value)}
              autoComplete="off"
              required
            />
            <div id="input-group_login">
              <input id="cidade"
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={e =>setCidade(e.target.value)}
                autoComplete="off"
                required
              />
              <select id="uf" value={estado} onChange={e =>setEstado(e.target.value)}>
                <option selected>UF</option>
                <option>AC</option>
                <option>AL</option>
                <option>AM</option>
                <option>AP</option>                
                <option>BA</option>
                <option>CE</option>
                <option>DF</option>
                <option>ES</option>
                <option>GO</option>
                <option>MA</option>                
                <option>MG</option>
                <option>MS</option>
                <option>MT</option>                
                <option>PA</option>
                <option>PB</option>
                <option>PE</option>
                <option>PI</option>
                <option>PR</option>                
                <option>RJ</option>
                <option>RN</option>
                <option>RO</option>
                <option>RR</option>
                <option>RS</option>                
                <option>SC</option>
                <option>SE</option>
                <option>SP</option>                
                <option>TO</option>
              </select>
            </div>
            <input id="senha_cadastro" 
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e =>setSenha(e.target.value)}
              required
            />
            <Button className="botao" variant="secondary" type="submit">Enviar</Button>
            <Button className="botao" variant="secondary" onClick={handleClose2}>Fechar</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
    </>
  );
}