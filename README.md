



<div align="center" display='flex'>
<img height="150" width="150" src="./src/assets/logo.png" /> 

#  Projeto Trackit 
</div>

<p align="center">
<img height="500" width="500" src="./src/assets/trackit_gif.gif"> <br> <br>
<a href='https://track-it-rose.vercel.app/'><button>  Teste aqui!</button></a>
</p>

# Tabela de Conteúdos

* [Sobre](#sobre)
* [Documentação da API](#documentação_API)
* [Requisitos do projeto](#pré-requisitos)
* [Tecnologias](#tecnologias)
* [Testando o projeto](#testando)

# Sobre
<h3> O objetivo desse projeto foi contruir uma aplicação completa de acompanhamento de hábitos! Com direito a cadastro, login e muitas bibliotecas 🙂</h3>
 <h3>O cliente poderá poderá fazer o cadastro na biblioteca e escolher quais seus hábitos/afazeres que tem durante os dias da semana, podendo editá-lo em caso de preenchimento incorreto.</h3>
<h3>  Ao escolher seus hábitos, o usuário poderá dar um "check" ao finalizar a tarefa e conferir quais de suas metas diárias foram cumpridas e quais ainda precisam ser realizadas.</h3><br>
<h3>  Bibliotecas utilizadas:<br>
- <b>react-loader-spinner; <br>
- react-circular-progressbar;<br>
- dayjs</b><br>
</h3>
 <br>



# Documentação da API

<h3>Aqui está detalhada a documentação da API que consumimos para a construção desse projeto.</h3>

<details>

- **POST** Fazer cadastro
    
    Para fazer cadastro, faça uma requisição `POST` para a URL
    
    ```
    https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up
    ```
    
    enviando um corpo no formato
    
    ```jsx
    {
    	email: "...",
    	name: "...",
    	image: "...",
    	password: "..."
    }
    ```
    
- **POST** Fazer login
    
    Para fazer cadastro, faça uma requisição `POST` para a URL
    
    ```
    https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login
    ```
    
    enviando um corpo no formato
    
    ```jsx
    {
    	email: "...",
    	password: "..."
    }
    ```
    
    O servidor responderá com um objeto no formato
    
    ```json
    {
        "id": 3,
        "name": "Joe",
        "image": "https://http.cat/411.jpg",
        "email": "joe@respondeai.com.br",
        "password": "123456",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjIxMjg0NzExfQ.b8e3bYm7TnU5p6pfrCPPbzboax6gvh_gGNFR4T51FxY"
    }
    ```
    
- **POST** Criar hábito
    
    Para criar um hábito, faça uma requisição `POST` para a URL
    
    ```
    https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits
    ```
    
    enviando um corpo no formato
    
    ```jsx
    {
    	name: "Nome do hábito",
    	days: [1, 3, 5] // segunda, quarta e sexta
    }
    ```
    
    e um cabeçalho `Authorization` com formato `Bearer TOKEN`
    
    O servidor responderá com um objeto no formato
    
    ```json
    {
    	id: 1,
    	name: "Nome do hábito",
    	days: [1, 3, 5]
    }
    ```
    
- **GET** Listar hábitos
    
    Para listar os hábitos do usuário, faça uma requisição `GET` para a URL
    
    ```
    https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits
    ```
    
    com um cabeçalho `Authorization` com formato `Bearer TOKEN`
    
    O servidor responderá com uma array no formato
    
    ```json
    [
    	{
    		id: 1,
    		name: "Nome do hábito",
    		days: [1, 3, 5]
    	},
    	{
    		id: 2,
    		name: "Nome do hábito 2",
    		days: [1, 3, 4, 6]
    	}
    ]
    ```
    
- **DELETE** Deletar hábito
    
    Para excluir um hábito do usuário, faça uma requisição `DELETE` para a URL
    
    ```
    https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/ID_DO_HABITO
    ```
    
    com um cabeçalho `Authorization` com formato `Bearer TOKEN`, subtituindo `ID_DO_HABITO` na URL pelo id do hábito a ser deletado.
    
    **Dica**: pesquise sobre como enviar um request `DELETE` com axios
    
- **GET** Buscar hábitos de hoje
    
    Para fazer listar os hábitos do usuário, faça uma requisição `GET` para a URL
    
    ```
    https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today
    ```
    
    com um cabeçalho `Authorization` com formato `Bearer TOKEN`
    
    O servidor responderá com um array no formato
    
    ```json
    [
        {
            "id": 3,
            "name": "Acordar",
            "done": true,
            "currentSequence": 1,
            "highestSequence": 1
        }
    ]
    ```
    
- **POST** Marcar hábito como feito
    
    Para fazer listar os hábitos do usuário, faça uma requisição `POST` para a URL
    
    ```
    https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/ID_DO_HABITO/check
    ```
    
    com um cabeçalho `Authorization` com formato `Bearer TOKEN`, substituindo `ID_DO_HABITO` na URL pelo id do hábito a ser marcado.
    
    Se:
    
    - O hábito já estiver marcado
    - O hábito não for do dia atual
    - O hábito não for do usuário logado
    
    o servidor vai responder com `Bad Request (400)`.
    
- **POST** Desmarcar hábito como feito
    
    Para fazer listar os hábitos do usuário, faça uma requisição `POST` para a URL
    
    ```
    https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/ID_DO_HABITO/uncheck
    ```
    
    com um cabeçalho `Authorization` com formato `Bearer TOKEN`, substituindo `ID_DO_HABITO` na URL pelo id do hábito a ser marcado.
    
    Se:
    
    - O hábito não estiver marcado
    - O hábito não for do dia atual
    - O hábito não for do usuário logado
    
    o servidor vai responder com `Bad Request (400)`.
    
- **GET** Histórico de hábitos diário
    
    Para obter o histórico de hábitos diário do usuário, faça uma requisição `GET` para a URL
    
    ```
    https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily
    ```
    
    com um cabeçalho `Authorization` com formato `Bearer TOKEN`
    
    O servidor responderá com um array no formato
    
    ```json
    [
        {
            "day": "20/05/2021",
            "habits": [
                {
                    "id": 3,
                    "name": "Acordar",
                    "date": "2021-05-20T12:00:00.000Z",
                    "weekDay": 4,
                    "historyId": null,
                    "done": false
                }
            ]
        },
        {
            "day": "19/05/2021",
            "habits": [
                {
                    "id": 3,
                    "name": "Acordar",
                    "date": "2021-05-19T12:00:00.000Z",
                    "weekDay": 3,
                    "historyId": 626,
                    "done": true
                },
                {
                    "id": 1,
                    "name": "Ler 1 capítulo do livro",
                    "date": "2021-05-19T12:00:00.000Z",
                    "weekDay": 3,
                    "historyId": 625,
                    "done": true
                }
            ]
        },
        {
            "day": "18/05/2021",
            "habits": [
                {
                    "id": 3,
                    "name": "Acordar",
                    "date": "2021-05-18T12:00:00.000Z",
                    "weekDay": 2,
                    "historyId": 7,
                    "done": true
                }
            ]
        },
        {
            "day": "17/05/2021",
            "habits": [
                {
                    "id": 1,
                    "name": "Ler 1 capítulo do livro",
                    "date": "2021-05-17T12:00:00.000Z",
                    "weekDay": 1,
                    "historyId": 1,
                    "done": true
                }
            ]
        },
        {
            "day": "16/05/2021",
            "habits": [
                {
                    "id": 1,
                    "name": "Ler 1 capítulo do livro",
                    "date": "2021-05-16T12:00:00.000Z",
                    "weekDay": 0,
                    "historyId": null,
                    "done": false
                }
            ]
        },
        {
            "day": "14/05/2021",
            "habits": [
                {
                    "id": 1,
                    "name": "Ler 1 capítulo do livro",
                    "date": "2021-05-14T12:00:00.000Z",
                    "weekDay": 5,
                    "historyId": null,
                    "done": false
                }
            ]
        }
    ]
    ```
    
    Repare que **o servidor só responde com os dias que o usuário deveria ou não ter feito um hábito**.

</details>



 <br>

# pré-requisitos

<h3>Aqui estão detalhados os requisitos necessários que o projeto deveria ter para sua aprovação.</h3>


<details>

- Layout
    - [x]  O CSS deve ser implementado utilizando **Styled Components**
    - [x]  O CSS deve ser implementado utilizando **Styled Components**
    - [x]  Não é necessário fazer a versão para desktop, somente mobile

- Tela Login (rota /)

    - [x]  Deve ser enviado o email e senha para a API conforme documentação
    - [x]  Enquanto estiver carregando, os campos e o botão devem ser desabilitados, conforme layout
        
        **Dica**: para fazer a animação de loading, utilize a biblioteca `react-loader-spinner`
        
    - [x]  Em caso de sucesso, o usuário deve ser redirecionado para a rota `/hoje`
    - [x]  Em caso de falha, deve ser exibido um `alert` informando para o usuário e os campos/botão devem ser habilitados novamente
    - [x]  Ao clicar no link para se cadastrar, o usuário deve ser redirecionado para a rota `/cadastro`


- Tela Cadastro (rota /cadastro)

    - [x]  Os dados devem ser enviados para a API conforme documentação
    - [x]  Enquanto estiver carregando, os campos e o botão devem ser desabilitados, conforme layout
    - [x]  Em caso de sucesso, o usuário deve ser redirecionado para a rota `/` (rota de Login)
    - [x]  Em caso de falha, deve ser exibido um alert informando para o usuário e os campos/botão devem ser habilitados novamente
    - [x]  Ao clicar no link para logar, o usuário deve ser redirecionado para a rota `/` (rota de Login)


- Topo e Menu

    - [x]  Topo e menu devem ter posicionamento fixo
    - [x]  No topo deve ser exibida a foto do usuário conforme layout
        
        **OBS**: Utilize ContextAPI para compartilhar o estado do usuário logado globalmente entre os componentes.
        
    - [x]  No menu, os 3 botões de Hábitos, Hoje e Histórico devem redirecionar o usuário para as rotas `/habitos`, `/hoje` e `/historico` respectivamente
    - [x]  O botão de Hoje deve exibir uma barra de progresso circular indicando a porcentagem de conclusão de hábitos de hoje do usuário
        
        **Dica**: utilize a biblioteca `react-circular-progressbar`
        
        **OBS**: Esse progresso deve ser atualizado automaticamente conforme o usuário for concluindo os hábitos. Utilize ContextAPI para compartilhar esse estado globalmente entre os componentes.


- Tela Hábitos (rota `/habitos`)
    - [x]  Carregar os hábitos do usuário, mandando request pra API conforme documentação e exibindo abaixo conforme layout
    - [x]  Ao clicar para deletar um hábito, deve ser exibido um `confirm` para confirmar se o usuário gostaria realmente de apagar o hábito. Se sim, deve ser enviado um request pra API conforme documentação e os hábitos recarregados logo em seguida.
    - [x]  Caso o usuário não tenha nenhum hábito cadastrado, deve ser exibido o texto conforme layout
    - [x]  Ao clicar no botão de "+", deve-se exibir um formulário de cadastro de hábito logo abaixo do título conforme layout
    - [x]  O usuário deve inserir o nome do hábito em um campo de texto e selecionar os dias da semana que deseja realizar o hábito conforme layout
    - [x]  Ao salvar, devem ser enviados os dados para API conforme documentação
    - [x]  Enquanto estiver carregando, o campo de texto e o botão devem ser desabilitados, conforme layout. Os botões dos dias da semana devem ser desabilitados, porém não é necessária mudança visual durante o loading.
    - [x]  Em caso de sucesso, os campos devem ser limpos e reabilitados, o formulário deve ser escondido novamente e a lista de hábitos abaixo recarregada
    - [x]  Em caso de erro, os campos devem ser reabilitados e um alerta deve indicar o problema para o usuário
    - [x]  Ao Cancelar, o formulário deve ser escondido. Caso tenha dados já preenchidos, os mesmos devem ser mantidos caso o usuário reabra o formulário de criação.
- Tela Hoje (rota `/hoje`)
    - [x]  Carregar os hábitos de hoje do usuário, mandando request pra API conforme documentação e exibindo abaixo conforme layout
    - [x]  O título da tela deve exibir o dia de hoje conforme layout
        
        **Dica**: utilize a biblioteca `dayjs` para isso
        
    - [x]  No subtítulo deve ser exibida a frase "Nenhum hábito concluído ainda" ou "x% dos hábitos concluídos", dependendo do progresso do usuário
    - [x]  Ao marcar ou desmarcar um hábito como concluído, deve ser enviado um request pra API conforme documentação. Não é necessário colocar loading.
    - [x]  Ao marcar um hábito como concluído, deve ser colocada em verde a contagem da sequência atual
    - [x]  Caso a sequência atual seja igual ao recorde do usuário, este também deve ser exibido em verde
- Tela Histórico (rota `/historico`)
    - [x]  Deve ser exibido o texto conforme layout
</details>


# Tecnologias

<details>
    <summary><font size="4">JavaScript</font></summary>
  <h3> Toda a lógica de programação da aplicação foi desenvolvida usando JavaScript.</h3>
</details>

<details>
    <summary><font size="4">React e styled-Component</font></summary>
  <h3> Nesse projeto utilizamos o framework React para construir uma Single-Page Application (SPA) para uma rede social onde usuário compartilham suas experiências literárias, usando React Router, styled component e consumindo uma API!</h3>
</details>


<br>
<div display='flex'>
 <img  height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
<img  height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" /> 

</div> <br>

# Testando


<h3> Antes de começar você precisará ter instalado na sua máquina um setup de um projeto react, o que inclui:<a href='https://www.devmedia.com.br/como-instalar-o-node-js-npm-e-o-react-no-windows/40329'> npm </a> e create-react-app (caso você queira começar o projeto do zero). Além disso, é bom ter um editor para trabalhar com o código como o <a href='https://code.visualstudio.com/download' > VSCode.</a> </h3>
<h3> Não esqueça também de ir no <a href='https://github.com/CaioVitor1/literaBooks_back' > repositório do back-end</a> do nosso projeto para conferir seu funcionamento para testá-lo na sua máquina  </h3>
<h3> <b>Rodando o projeto em sua máquina:</b> </h3>

```bash

 # Clone o repositório do projeto:
 git clone</b> https://github.com/CaioVitor1/TrackIt.git
 # Acesse a pasta do projeto:
 cd trackit
 # Instale as dependencias:
  npm i
 # Execute a aplicação em modo de desenvolvimento: 
 npm start
# O servidor irá rodar na porta 3000. Acesse: http://localhost:3000/ 
```

---

Made with love by <a href='https://www.linkedin.com/in/caiovitor33/'> Caio Vitor </a>
    