import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useParams } from 'react-router-dom';
import MaskedInput from 'react-text-mask';

import { Navbar, Nav, Card, Button, NavDropdown, Accordion } from 'react-bootstrap';

import { jsPDF } from "jspdf";

import api from '../../api';
import './home.css';
import logoFatoracao from '../../images/fatoracao.png';
import logoUFMG from '../../images/ufmg.png';
import enem2019 from '../../images/enem_2019.png';
import pdf from '../../images/pdf.png';
import video1 from '../../images/video1.mp4';
import video1_poster from '../../images/video1.png'
import video2 from '../../images/video2.mp4';
import video3 from '../../images/video3.mp4';
import vinheta from '../../images/vinheta.mp4';

import camera from '../../images/camera.jpg';

export default function Home() {

  var aluno_nome = localStorage.getItem('aluno_nome');
  var aluno_email = localStorage.getItem('aluno_email');
  var aluno_celular = localStorage.getItem('aluno_celular');
  var aluno_cidade = localStorage.getItem('aluno_cidade');
  var aluno_estado = localStorage.getItem('aluno_estado');
  var aluno_id = localStorage.getItem('aluno_id');
  var token = localStorage.getItem('token');

  var [nome, setNome] = useState(aluno_nome);
  var [email, setEmail] = useState(aluno_email);  
  var [celular, setCelular] = useState(aluno_celular);
  var [cidade, setCidade] = useState(aluno_cidade);
  var [estado, setEstado] = useState(aluno_estado);
  var [palavra, setPalavra] = useState('');

  var thumbnail = null;
  var preview = null;

  var vestibular = "";
  var ano = "";
  var questao = "";

  function miniatura() {
    thumbnail = document.getElementById('arquivo_questao').files[0];
    preview = URL.createObjectURL(thumbnail);
    comunidade();
  }

  const [alunos, setAlunos] = useState([]);
  useEffect(() => {
    api.get('auth/alunos').then(response => {
      setAlunos(response.data);
    })
  }, [aluno_id]);

  //const [questoes, setQuestoes] = useState([]);
  //useEffect(() => {
  //  api.get('/questoes',
  //    {
  //      headers: { 'authorization': token} 
  //    }    
  //  ).then(response => {
  //    setQuestoes(response.data);
  //  })
  //}, [aluno_id]);

  var oculto = true;
  if (aluno_nome === "FATORAÇÃO") { oculto = false; }

  const history = useHistory();

  if (localStorage.length === 0 | aluno_nome === "undefined") {
    alert ('Favor logar no sistema!');
    history.push('/');
  }

  function playVideo() {
    var video = document.getElementById("vinheta");    
    video.setAttribute("controls", "controls");
    video.setAttribute("disablePictureInPicture", "disablePictureInPicture");
    video.setAttribute("controlsList", "nodownload");    
  }

  function home() {    
    const homeHTML =
      <div id="home">
        <img id="fatoracao_home" src={logoFatoracao}/>
      </div>
    ReactDOM.render(homeHTML, document.getElementById('corpo'));  
  }

  function motivacao() {    
    const motivacaoHTML =
      <div id="motivacao">
        <p>Após a divulgação em 03/12/2019 dos resultados do PISA 2018 (Programa Internacional de Avaliação de Estudantes) em que o Brasil apresentou um dos 10 piores desempenhos do mundo em matemática, percebemos que nossos estudantes brasileiros precisariam ser ajudados, de alguma forma, a conseguir melhores notas nas provas aplicadas.
        </p>
        <p>Desta forma, nossa equipe se sentiu motivada a vir para a internet e criar o canal <strong>FATORAÇÃO</strong> com a missão de ensinar os conceitos da matemática de uma forma mais prática, através de questões resolvidas das mais variadas instituições de ensino.
        </p>
        <p>Entendemos que os estudantes devem <em>aprender bem, estudar melhor e praticar mais</em>.
        </p>
        <p>Contem conosco e sejam bem-vindos à comunidade!
        </p>
        <p>Atenciosamente,
        </p>
        <p><strong>LUCIANO NOGUEIRA CARDOSO</strong>
        <br/>Criador do canal <strong>FATORAÇÃO</strong>
        <br/><em>Engenheiro Eletricista, 2006</em>
        <br/><img id="ufmg" src={logoUFMG}/></p>
      </div>
    ReactDOM.render(motivacaoHTML, document.getElementById('corpo'));  
  }

  function livros() {    
    const livrosHTML =
      <div id="livros">
        <div id="enem2019">
          <Card className="card_enem" style={{ width: '200px' }}>
            <Card.Img variant="top" src={enem2019} />
            <Card.Body>
              <Card.Img variant="top" src={pdf} style={{ width: '40px', height: '40px' }}/>
              <strong>AMOSTRA</strong>
              <p><Button id="botao_livro" variant="primary">Quero meu livro!</Button></p>
            </Card.Body>
          </Card>            
        </div>
      </div>
    ReactDOM.render(livrosHTML, document.getElementById('corpo'));  
  }

  function videos() {    
    const videosHTML =
      <div id="videos">
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle id="topico" variant="link" eventKey="0">
                Geometria Analítica
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <video id="vinheta" type="video/mp4" poster={video1_poster} src={vinheta} onClick={playVideo}></video>
              </Card.Body>              
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle id="topico" variant="link" eventKey="1">
                Trigonometria
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body><video id="video1" type="video/mp4" src={video2} autoPlay loop></video></Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle id="topico" variant="link" eventKey="2">
                Matrizes
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body><video id="video1" type="video/mp4" src={video3} autoPlay loop></video></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    ReactDOM.render(videosHTML, document.getElementById('corpo'));  
  }

  async function comunidade() {
    palavra = 'Selecione';
    var spots = '';
    try {      
      spots = await api.get('/questoes',
        {
          headers: { palavra }
        }
      );
      const newSpots = [ ...new Set( spots.data.map(spot => (spot.vestibular)) ) ];
      const comunidadeHTML =
        <div id="comunidade">        
          <form onSubmit={handleQuestao}>
            <p><label
              id="thumbnail"
              style ={{backgroundImage: `url(${preview})`}}
              className = {thumbnail ? 'has-thumbnail' : ''}
            >
              <input type="file" id="arquivo_questao" onChange={miniatura}/>
              <img src={camera} alt="Selecionar imagem" />
            </label></p>
            <p><label id="texto_questao">Vestibular: </label>
            <input
              id="input_vestibular"
            /></p>
            <p><label id="texto_questao">Ano: </label>
            <input
              id="input_ano"
            /></p>
            <p><label id="texto_questao">Questão: </label>
            <input
              id="input_questao"
            /></p>
            <button type="submit" className="btn">Cadastrar</button>
          </form>
          <hr></hr>
          <p><label id="texto_questao">Palavra: </label>
            <select id="input_palavra">
              <option defaultValue>Selecione</option>
              {newSpots.map(spot => (                
                <option>{spot}</option>
              ))}
            </select>        
          </p>
          <p>
            <button className="btn" onClick={handlePesquisa}>Pesquisar</button>
          </p>
        </div>
      ReactDOM.render(comunidadeHTML, document.getElementById('corpo'));
    } catch (err) {
      alert ('Erro na abertura da comunidade! Tente novamente!');
    }
  }

  async function handleQuestao(event){

    event.preventDefault();

    vestibular = document.getElementById('input_vestibular').value;
    ano = document.getElementById('input_ano').value;
    questao = document.getElementById('input_questao').value;

    const data = new FormData();
    
    data.append('thumbnail', thumbnail);
    data.append('vestibular', vestibular);
    data.append('ano', ano);
    data.append('questao', questao);
    
    try {
      await api.post('questoes', data, {
        //headers: { 'authorization': token},
        headers: { aluno_id },
      });
      alert ('Questão cadastrada com sucesso!');
    } catch (err) {
      alert ('Erro no cadastro da questão! Tente novamente!');
    }
  }

  async function handlePesquisa(event){
    event.preventDefault();
    palavra = document.getElementById('input_palavra').value;
    var spots = '';
    var lista = '';
    try {      
      spots = await api.get('/questoes',
        {
          headers: { palavra }
        }
      );
      lista = await api.get('/questoes',
        {
          headers: { palavra: 'Selecione' }
        }
      );
      const newLista = [ ...new Set( lista.data.map(list => (list.vestibular)) ) ];
      const pesquisaHTML =
      <div id="comunidade">        
        <form onSubmit={handleQuestao}>
          <p><label
            id="thumbnail"
            style ={{backgroundImage: `url(${preview})`}}
            className = {thumbnail ? 'has-thumbnail' : ''}
          >
            <input type="file" id="arquivo_questao" onChange={miniatura}/>
            <img src={camera} alt="Selecionar imagem" />
          </label></p>

          <p><label id="texto_questao">Vestibular: </label>
          <input
            id="input_vestibular"
          /></p>

          <p><label id="texto_questao">Ano: </label>
          <input
            id="input_ano"
          /></p>

          <p><label id="texto_questao">Questão: </label>
          <input
            id="input_questao"
          /></p>

          <button type="submit" className="btn">Cadastrar</button>
        </form>
        <hr></hr>
        <p><label id="texto_questao">Palavra: </label>
          <select id="input_palavra">
            <option defaultValue>Selecione</option>
            {newLista.map(spot => (                
              <option>{spot}</option>
            ))}
          </select>
        </p>
        <p>
          <div id="pesquisa">
            <button className="btn" onClick={handlePesquisa}>Pesquisar</button>
            <button id="botao_pdf" onClick={geraPDF}>Exportar questões<br/>em formato PDF</button>
          </div>
        </p>
        <div id="pdf">
          {spots.data.map(spot => (
            <div id="questao">
              <span id="titulo">{spot.vestibular}</span> / {spot.ano} / Questão {spot.questao}
              <p><p><img id="spot-list" src = {spot.thumbnail_url}/></p></p>
            </div>
          ))}
        </div>
      </div>
      ReactDOM.render(pesquisaHTML, document.getElementById('corpo'));
    } catch (err) {
      alert ('Erro na pesquisa! Tente novamente!');
    }
  }

  async function geraPDF(event){
    event.preventDefault();
    try {
      var conteudo = document.getElementById('pdf').innerHTML;
      var configuracoes = document.body.innerHTML;
      document.body.innerHTML = conteudo;
      window.print();
      document.body.innerHTML = configuracoes;
    } catch (err) {
      alert ('Erro na criação do arquivo PDF! Tente novamente!');
    }
  }

  function cadastro() {    
    const cadastroHTML =
      <div id="cadastro_logado">
        <p><span id="texto_cadastro">Nome: </span><input id="input_cadastro_nome" value={aluno_nome} disabled /></p>
        <p><span id="texto_cadastro">E-mail: </span><input id="input_cadastro_email" value={aluno_email} disabled /></p>
        <p><span id="texto_cadastro">Celular: </span>
          <MaskedInput id="input_cadastro_celular"
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            value={aluno_celular}
            disabled
          />
        </p>
        <p>
        <div id="input-group_home">
          <span id="texto_cadastro">Cidade: </span><input id="input_cadastro_cidade" value={aluno_cidade} disabled />
          <select id="input_cadastro_estado" value={aluno_estado} disabled>
            <option defaultValue>UF</option>
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
        </p>
        <button id="botao_cadastro" onClick={handleEdit}>Editar</button>
        <button id="botao_cadastro" onClick={handleSave}>Salvar</button>
      </div>
    ReactDOM.render(cadastroHTML, document.getElementById('corpo'));  
  }

  function handleEdit() {    
    const editarHTML =
      <div id="cadastro_logado">
        <p><span id="texto_cadastro">Nome: </span><input id="input_cadastro_nome" /></p>
        <p><span id="texto_cadastro">E-mail: </span><input id="input_cadastro_email" /></p>
        <p><span id="texto_cadastro">Celular: </span>
          <MaskedInput id="input_cadastro_celular"
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            value={aluno_celular}
          />
        </p>
        <p>
        <div id="input-group_home">
          <span id="texto_cadastro">Cidade: </span><input id="input_cadastro_cidade"/>
          <select id="input_cadastro_estado">
            <option defaultValue>UF</option>
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
        </p>
        <button id="botao_cadastro" onClick={handleEdit}>Editar</button>
        <button id="botao_cadastro" onClick={handleSave}>Salvar</button>
      </div>
    ReactDOM.render(editarHTML, document.getElementById('corpo'));  
  }

  async function handleSave(e){
    e.preventDefault();
    nome = document.getElementById("input_cadastro_nome").value;
    email = document.getElementById("input_cadastro_email").value;
    celular = document.getElementById("input_cadastro_celular").value;
    cidade = document.getElementById("input_cadastro_cidade").value;
    estado = document.getElementById("input_cadastro_estado").value;

    const data = {
      nome, email, celular, cidade, estado, aluno_id
    };
    try {
      const response = await api.put('auth/save/', data);
      alert ('Cadastro alterado com sucesso!');
    } catch (err) {
      alert ('Erro na alteração do cadastro! Tente novamente!');
    }
    aluno_nome = nome;
    aluno_email = email;
    aluno_celular = celular;
    aluno_cidade = cidade;
    aluno_estado = estado;
    const cadastroHTML =
      <div id="cadastro_logado">
        <p><span id="texto_cadastro">Nome: </span><input id="input_cadastro_nome" value={aluno_nome} disabled /></p>
        <p><span id="texto_cadastro">E-mail: </span><input id="input_cadastro_email" value={aluno_email} disabled /></p>
        <p><span id="texto_cadastro">Celular: </span>
          <MaskedInput id="input_cadastro_celular"
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            value={aluno_celular}
            disabled
          />
        </p>
        <p>
        <div id="input-group_home">
          <span id="texto_cadastro">Cidade: </span><input id="input_cadastro_cidade" value={aluno_cidade} disabled />
          <select id="input_cadastro_estado" value={aluno_estado} disabled>
            <option defaultValue>UF</option>
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
        </p>
        <button id="botao_cadastro" onClick={handleEdit}>Editar</button>
        <button id="botao_cadastro" onClick={handleSave}>Salvar</button>
      </div>
    ReactDOM.render(cadastroHTML, document.getElementById('corpo'));
  }

  function handleLogout () {
    localStorage.clear();
    history.push('/');
  }

  function banco () {
    const alunosHTML =
      <div id="banco">
        <table id="tabela">
          <tr>
            <td id="td_nome"><strong>NOME:</strong></td>
            <td id="td_celular"><strong>CELULAR:</strong></td>
            <td id="td_email"><strong>EMAIL:</strong></td>
            <td id="td_cidade"><strong>CIDADE:</strong></td>
            <td id="td_estado"><strong>UF:</strong></td>
          </tr>
          {alunos.map(aluno => (
          <tr key={aluno.email}>
            <td id="banco_nome">{aluno.nome}</td>
            <td id="banco_celular">{aluno.celular}</td>
            <td id="banco_email">{aluno.email}</td>
            <td id="banco_cidade">{aluno.cidade}</td>
            <td id="banco_estado">{aluno.estado}</td>
          </tr>            
          ))}
        </table>
      </div>
    ReactDOM.render(alunosHTML, document.getElementById('corpo'));
  }

  return (
    <div className="grid-container">
      <div id="canto">
      </div>
      <div id="cima">
        <NavDropdown id="basic-nav-dropdown" title={aluno_nome}>
          <NavDropdown.Item onClick={cadastro}>Cadastro</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>SAIR</NavDropdown.Item>
        </NavDropdown>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Toggle id="botao_menu" aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={home} eventKey={1}>HOME</Nav.Link>
              <Nav.Link onClick={motivacao} eventKey={2}>MOTIVAÇÃO</Nav.Link>
              <Nav.Link onClick={livros} eventKey={3}>LIVROS</Nav.Link>
              <Nav.Link onClick={videos} eventKey={4}>VIDEOS</Nav.Link>
              <Nav.Link onClick={comunidade} eventKey={5}>COMUNIDADE</Nav.Link>
              <Nav.Link onClick={banco} eventKey={6} hidden={oculto}>ALUNOS</Nav.Link>
            </Nav>
          </Navbar.Collapse>          
        </Navbar>
      </div>
      <div id="esquerda">
      </div>
      <div id="corpo">
        <div id="home">
          <img id="fatoracao_home" src={logoFatoracao}/>
        </div>
      </div>
    </div>
  );
}