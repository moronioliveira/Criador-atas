const domingos = 5;
const funcoes = ["Presidida", "Dirigida", "Reconhecimentos", "Anúncios", "1° Hino", "Regente",
    "Organista", "1° oração", "Chamados, Desobrigações e Ordenanças", "Hino sacramental", "1° orador", "2° orador",
     "Hino intermediário", "Ultimo orador", "Ultimo hino", "Ultima oração"
];

 
const tabela = document.getElementById("tabela-escala");

let dadosEscala = {};

function desenharTabela(){
    let conteudoHtml = "<tr>";
    conteudoHtml += "<th>Funções</th>";
    
    for(let i = 1; i <= domingos; i++){
        conteudoHtml += `<th>Domingo ${i}</th>`;  
    }
    conteudoHtml += "</tr>"; 

    conteudoHtml += "<td></td>"

    for(let i = 1; i <= domingos; i++){
        conteudoHtml += `<td><button onclick="gerarAta(${i})">Gerar</button></td>`;
    }
    conteudoHtml += "</tr>"


    funcoes.forEach(function(funcao){
        conteudoHtml += "<tr>";
        conteudoHtml += `<td> ${funcao}</td>`;
        for (let domingo = 1; domingo <= domingos; domingo++){
            conteudoHtml += `<td><textarea id="${funcao}-${domingo}"></textarea></td>`
        }
        conteudoHtml += "</tr>";

    })
    
    tabela.innerHTML = conteudoHtml;

tabela.addEventListener("input", function(evento){
    let itemId = evento.target.id;
    let valor = evento.target.value;

    dadosEscala[itemId] = valor;

    localStorage.setItem("minha-tabela", JSON.stringify(dadosEscala));
})
    
}
desenharTabela();

function carregarTabela(){
   let dadosSalvos = localStorage.getItem("minha-tabela");

   if (dadosSalvos !== null){
    dadosEscala = JSON.parse(dadosSalvos);

   for(let idDoInput in dadosEscala){
    let nomeDigitado = dadosEscala[idDoInput];
    if (document.getElementById(idDoInput) != null) {
         document.getElementById(idDoInput).value = nomeDigitado;
    }
   
   }
   }
}
carregarTabela();

const botaoLimpar = document.getElementById("btn-limpar");
botaoLimpar.addEventListener("click", function limparTabela(){
    localStorage.removeItem("minha-tabela")
    dadosEscala = {};
    location.reload();
});

function lerDados(funcao, domingo){

  return dadosEscala[`${funcao}-${domingo}`] ?? "";

}

function gerarAta(domingo){

let textoAta = `Reunião Sacramental Ala Dom Pedro II

Data: ___/___/___

Presidida: ${lerDados("Presidida", domingo)}
Dirigida: ${lerDados("Dirigida", domingo)}
Reconhecimentos: ${lerDados("Reconhecimentos", domingo)}
Anúncios: ${lerDados("Anúncios", domingo)}
1° Hino: ${lerDados("1° Hino", domingo)}
Regente: ${lerDados("Regente", domingo)}
Organista: ${lerDados("Organista", domingo)}
1° Oração: ${lerDados("1° oração", domingo)}
Chamados, Desobrigações e Ordenanças: ${lerDados("Chamados, Desobrigações e Ordenanças", domingo)}
Hino Sacramental: ${lerDados("Hino sacramental", domingo)}
Após o hino o sacramento será abençoado e distribuido a todos.

1° Orador: ${lerDados("1° orador", domingo)}
2° Orador: ${lerDados("2° orador", domingo)}
Hino Intermediário: ${lerDados("Hino intermediário", domingo)}
Ultimo Orador: ${lerDados("Ultimo orador", domingo)}
Ultimo Hino: ${lerDados("Ultimo hino", domingo)}
Ultima Oração: ${lerDados("Ultima oração", domingo)}

Frequência: ___
`;

let janelaImpressao = window.open("");
janelaImpressao.document.write(
    `<style>
    @media print{
    .no-print{display: none;}}
    .ata{
    font-size: 20px;
    line-height: 1.6;
    font-family: Arial, sans-serif;
    padding: 20px;
    white-space: pre-wrap;}
    </style>
    <pre class="ata">
    ${textoAta}
    <button class= "no-print" onclick="window.print()">Impressão</button>
    </pre>`
);

return textoAta;
}