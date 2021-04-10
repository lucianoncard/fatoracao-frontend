import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-text-mask';

import { Navbar, Nav, Card, NavDropdown, Accordion } from 'react-bootstrap';

import { FiTrash2 } from 'react-icons/fi';

import { Chart } from "react-google-charts";

import api from '../../api';
import './home.css';
import logoFatoracao from '../../images/fatoracao.png';
import enem2019 from '../../images/enem_2019.png';
import pdf from '../../images/pdf.png';
import video_poster from '../../images/video1.png'
import vinheta from '../../images/vinheta.mp4';

import camera from '../../images/camera.jpg';

import amostra from '../../livros/enem2019_amostra.pdf';

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
        </p>
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
              <strong><a href={amostra} target="_blank">AMOSTRA</a></strong>
              <p>
                <a href="https://pag.ae/7V-6eScxK/button" target="_blank" title="Pagar com PagSeguro">
                  <img src="//assets.pagseguro.com.br/ps-integration-assets/botoes/pagamentos/160x20-pagar-laranja.gif"
                  alt="Pague com PagSeguro - é rápido, grátis e seguro!" />
                </a>
              </p>
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
                <video id="vinheta" type="video/mp4" poster={video_poster} src={vinheta} onClick={playVideo}></video>
                <ol>
                  <li>Conceitos iniciais</li>
                  <li>Estudo da reta</li>
                  <li>Circunferência</li>
                  <li>Cônicas</li>
                </ol>
              </Card.Body>              
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle id="topico" variant="link" eventKey="1">
                Números Complexos
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <ol>
                  <li>O conjunto dos números complexos</li>
                  <li>Forma trigonométrica de um número complexo</li>
                  <li>Operações na forma trigonométrica</li>
                </ol>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle id="topico" variant="link" eventKey="2">
                Polinômios
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <ol>
                  <li>Polinômios</li>
                  <li>Equações polinomiais</li>
                </ol>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle id="topico" variant="link" eventKey="3">
                Limites e Derivadas
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <ol>
                  <li>Limites</li>
                  <li>Derivadas das funções elementares</li>
                  <li>Estudo local das funções deriváveis</li>
                </ol>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle id="topico" variant="link" eventKey="4">
                Noções de Estatística
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                <ol>
                  <li>Introdução</li>
                  <li>Média e mediana</li>
                </ol>
              </Card.Body>
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

  async function handlePesquisa(){
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
      const newLista = [ ...new Set( lista.data.map(list => (list.vestibular))) ];
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
              <span id="titulo">{spot.vestibular} / {spot.ano} / Questão {spot.questao}</span><button id="lixeira" onClick={() => handleDelete(spot.user, spot.id)}><FiTrash2 size={20} color="#a8a8b3" /></button>
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

  async function handleDelete(usuarioId,questaoId){
    const user = usuarioId;
    const questao = questaoId;
    try {
      await api.delete(`questoes`, {
        headers: {
          user, questao, aluno_id
        },
      });
      alert ('Questão removida com sucesso!');
      handlePesquisa();
    } catch (err) {
      alert ('Usuário não permitido!');
    }
  }

  async function geraPDF(){
    try {
      var conteudo = document.getElementById('pdf').innerHTML;
      var configuracoes = document.body.innerHTML;
      document.body.innerHTML = conteudo;
      window.print();
      document.body.innerHTML = configuracoes;
      window.close();
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

  async function excluir(){
    try {
      await api.delete('auth/alunos', {
        headers: {
          aluno_id
        },
      });
      alert ('Usuário removido com sucesso!');
      handleLogout();
    } catch (err) {
      alert ('Erro ao excluir usuário!');
    }
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
      <div id="alunos">        
        {alunos.map(aluno => (
          <div id="cartao_aluno">
            {aluno.nome}<br/>
            {aluno.celular}<br/>
            {aluno.email}<br/>
            {aluno.cidade}/{aluno.estado}<br/>
            ID: {aluno._id}<br/>
          </div>
        ))}
      </div>
    ReactDOM.render(alunosHTML, document.getElementById('corpo'));
  }

  async function questoes() {
    var lista = '';
    try {      
      lista = await api.get('/questoes',
        {
          headers: { palavra: 'Selecione' }
        }
      );
      const newLista = [ ...new Set( lista.data.map(list => (list.vestibular))) ];
      const questoesHTML =
        <div>
          <table id="tabela">
            <tr><td>VESTIBULAR</td><td>ANO</td><td>QUESTÃO</td><td>USUÁRIO</td></tr>
            {lista.data.map(spot => (              
              <tr>
                <td>{spot.vestibular}</td><td>{spot.ano}</td><td>{spot.questao}</td><td>{spot.user}</td>
              </tr>
            ))}
          </table>
        </div>
      ReactDOM.render(questoesHTML, document.getElementById('corpo'));
    } catch (err) {
      alert ('Erro na exibição das questões! Tente novamente!');
    }
  }

  async function graficos() {
    
    const UF = [ alunos.map(aluno => ( aluno.estado ))];
    function estado (array, value) {
      return array.filter((v) => (v === value)).length;
    };
    
    var lista = await api.get('/questoes',
      {
        headers: { palavra: 'Selecione' }
      }
    );
    const newLista = [ ...new Set( lista.data.map(list => (list.vestibular))) ];
    const questoes = [ lista.data.map(vestibular => ( vestibular.vestibular ))];
    function vestiba (array, value) {
      return array.filter((v) => (v === value)).length;
    };
    const array = [['Vestibular', 'Questões']];
    newLista.map (vestibular => (
      array.push([vestibular, vestiba(questoes[0],vestibular)])
    ));

    const usuarios = [ ...new Set( lista.data.map(list => (list.user))) ];
    const questions = [ lista.data.map(user => ( user.user ))];
    function usuario (array, value) {
      return array.filter((v) => (v === value)).length;
    };
    const array2 = [['Usuário', 'Questões']];
    usuarios.map (user => (
      array2.push([user, usuario(questions[0],user)])
    ));

    const newAno = [ ...new Set( lista.data.map(list => (list.ano))) ];
    const anos = [ lista.data.map(ano => ( ano.ano ))];
    function ano (array, value) {
      return array.filter((v) => (v === value)).length;
    };
    const array3 = [['Ano', 'Questões']];
    newAno.map (ano => (
      array3.push([ano, vestiba(anos[0],ano)])
    ));
    

    const graficosHTML =    
      <div id="indicadores">
        <div id="graficos">
          <Chart id="graficos"
            width={'300px'}
            height={'300px'}
            chartType="BarChart"
            data={[
              ['Estado', 'Usuários'],
              ['AC', estado(UF[0],'AC')],
              ['AL', estado(UF[0],'AL')],
              ['AM', estado(UF[0],'AM')],
              ['AP', estado(UF[0],'AP')],
              ['BA', estado(UF[0],'BA')],
              ['CE', estado(UF[0],'CE')],
              ['DF', estado(UF[0],'DF')],
              ['ES', estado(UF[0],'ES')],
              ['GO', estado(UF[0],'GO')],
              ['MA', estado(UF[0],'MA')],
              ['MG', estado(UF[0],'MG')],
              ['MS', estado(UF[0],'MS')],
              ['MT', estado(UF[0],'MT')],
              ['PA', estado(UF[0],'PA')],
              ['PB', estado(UF[0],'PB')],
              ['PE', estado(UF[0],'PE')],
              ['PI', estado(UF[0],'PI')],
              ['PR', estado(UF[0],'PR')],
              ['RJ', estado(UF[0],'RJ')],
              ['RN', estado(UF[0],'RN')],
              ['RO', estado(UF[0],'RO')],
              ['RR', estado(UF[0],'RR')],
              ['RS', estado(UF[0],'RS')],
              ['SC', estado(UF[0],'SC')],
              ['SE', estado(UF[0],'SE')],
              ['SP', estado(UF[0],'SP')],
              ['TO', estado(UF[0],'TO')]
            ]}
            options={{
              title: 'Nº Usuários por estado',
              chartArea: { width: '80%' },
              chartArea: { height: '90%' },
              colors: ['rgb(255, 127, 39)'],
              fontSize: 7,
              legend: { position: 'none' }
            }}
          />
        </div>
        <div id="graficos">
          <Chart id="graficos"
            width={'300px'}
            height={'300px'}
            chartType="PieChart"
            data={[
              ['Estado', 'Usuários'],
              ['AC', estado(UF[0],'AC')],
              ['AL', estado(UF[0],'AL')],
              ['AM', estado(UF[0],'AM')],
              ['AP', estado(UF[0],'AP')],
              ['BA', estado(UF[0],'BA')],
              ['CE', estado(UF[0],'CE')],
              ['DF', estado(UF[0],'DF')],
              ['ES', estado(UF[0],'ES')],
              ['GO', estado(UF[0],'GO')],
              ['MA', estado(UF[0],'MA')],
              ['MG', estado(UF[0],'MG')],
              ['MS', estado(UF[0],'MS')],
              ['MT', estado(UF[0],'MT')],
              ['PA', estado(UF[0],'PA')],
              ['PB', estado(UF[0],'PB')],
              ['PE', estado(UF[0],'PE')],
              ['PI', estado(UF[0],'PI')],
              ['PR', estado(UF[0],'PR')],
              ['RJ', estado(UF[0],'RJ')],
              ['RN', estado(UF[0],'RN')],
              ['RO', estado(UF[0],'RO')],
              ['RR', estado(UF[0],'RR')],
              ['RS', estado(UF[0],'RS')],
              ['SC', estado(UF[0],'SC')],
              ['SE', estado(UF[0],'SE')],
              ['SP', estado(UF[0],'SP')],
              ['TO', estado(UF[0],'TO')]
            ]}
            options={{
              title: 'Participação de cada estado',
              chartArea: { width: '90%' },
              legend: {position: 'none'},
              colors: ['rgb(255, 127, 39)']
            }}
          />
        </div>
        <div id="graficos">
          <Chart id="graficos"
            width={'300px'}
            height={'300px'}
            chartType="BarChart"
            data={array}
            options={{
              title: 'Nº Questões por vestibular',
              chartArea: { width: '60%' },
              colors: ['rgb(255, 127, 39)'],
              legend: { position: 'none' }
            }}
          />
        </div>
        <div id="graficos">
          <Chart id="graficos"
            width={'300px'}
            height={'300px'}
            chartType="BarChart"
            data={array3}
            options={{
              title: 'Nº Questões por ano',
              chartArea: { width: '60%' },
              colors: ['rgb(255, 127, 39)'],
              legend: { position: 'none' }
            }}
          />
        </div>
        <div id="graficos">
          <Chart id="graficos"
            width={'300px'}
            height={'300px'}
            chartType="BarChart"
            data={array2}
            options={{
              title: 'Nº Questões por usuário',
              chartArea: { width: '60%' },
              colors: ['rgb(255, 127, 39)'],
              legend: { position: 'none' }
            }}
          />
        </div>
      </div>
    ReactDOM.render(graficosHTML, document.getElementById('corpo'));
  }

  return (
    <div className="grid-container">
      <div id="canto">
      </div>
      <div id="cima">
        <NavDropdown id="basic-nav-dropdown" title={aluno_nome}>
          <NavDropdown.Item onClick={cadastro}>Cadastro</NavDropdown.Item>
          <NavDropdown.Item onClick={excluir}>Excluir conta</NavDropdown.Item>
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
              <Nav.Link onClick={questoes} eventKey={7} hidden={oculto}>QUESTÕES</Nav.Link>
              <Nav.Link onClick={graficos} eventKey={8} hidden={oculto}>GRÁFICOS</Nav.Link>
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