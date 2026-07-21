const domingos = 5;
const funcoes = ["Presidida", "Dirigida", "Reconhecimentos", "Anúncios", "1° Hino", "Regente",
    "Organista", "1° oração", "Chamados, Desobrigações e Ordenanças", "Hino sacramental", "1° orador", "2° orador",
     "Hino intermediário", "Ultimo orador", "Ultimo hino", "Ultima oração"
];

 
const tabela = document.getElementById("tabela-escala");

let dadosEscala = {};

function desenharTabela(){
    let conteudoHtml = "<tr>";
    conteudoHtml += "<th>Designações</th>";
    
    for(let i = 1; i <= domingos; i++){
        conteudoHtml += `<th>Domingo ${i}</th>`;  
    }
    conteudoHtml += "</tr>"; 

    conteudoHtml += "<td>(Clique 2 vezes no espaço em branco)</td>"

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

    conteudoHtml += `
        <tr>
            <td colspan="6" style="text-align: center; padding: 10px;">
                <button id="btn-limpar">Limpar escala</button>
            </td>
        </tr>
    `;

   
    tabela.innerHTML = conteudoHtml;

    
    tabela.addEventListener("input", function(evento){
        let itemId = evento.target.id;
        let valor = evento.target.value;

        dadosEscala[itemId] = valor;
        localStorage.setItem("minha-tabela", JSON.stringify(dadosEscala));
    });
} 

const modal = document.getElementById("meu-modal");
if (modal) {
    modal.addEventListener("input", function(evento) {
        let itemId = evento.target.id;
        let valor = evento.target.value;

        dadosEscala[itemId] = valor;

        localStorage.setItem("minha-tabela", JSON.stringify(dadosEscala));
    });
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
    }}}
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

let textoAta = `<h1>Reunião Sacramental Ala Dom Pedro II</h1>
<p class="sub">Data: ___/___/___ - Frequência: [    ]</p>
<B>Presidida:</B> ${lerDados("Presidida", domingo)}
<B>Dirigida:</B> ${lerDados("Dirigida", domingo)}
<B>Reconhecimentos:</B> ${lerDados("Reconhecimentos", domingo)}
<B>Anúncios:</B> ${lerDados("Anúncios", domingo)}
<B>1° Hino:</B> ${lerDados("1° Hino", domingo)}
<B>Regente:</B> ${lerDados("Regente", domingo)}
<B>Organista:</B> ${lerDados("Organista", domingo)}
<B>1° Oração:</B> ${lerDados("1° oração", domingo)}
<B>-------------------------------------------------------------------------------------------------------</B>
<B>Chamados, Desobrigações e Ordenanças:</B> ${lerDados("Chamados, Desobrigações e Ordenanças", domingo)}

<B>SACRAMENTO</B>
<B>Hino Sacramental:</B> ${lerDados("Hino sacramental", domingo)}
<B>Após o hino o sacramento será abençoado e distribuido a todos.</B>
<B>-------------------------------------------------------------------------------------------------------</B>
<B>1° Orador:</B> ${lerDados("1° orador", domingo)}
<B>2° Orador:</B> ${lerDados("2° orador", domingo)}
<B>-------------------------------------------------------------------------------------------------------</B>
<B>Hino Intermediário:</B> ${lerDados("Hino intermediário", domingo)}
<B>Ultimo Orador:</B> ${lerDados("Ultimo orador", domingo)}
<B>Ultimo Hino:</B>${lerDados("Ultimo hino", domingo)}
<B>Ultima Oração</B> ${lerDados("Ultima oração", domingo)}
`;

let janelaImpressao = window.open("");
janelaImpressao.document.write(
    `<style>
    @media print{
    .no-print{display: none;}}
    .ata{
    font-size: 16px;
    line-height: 1.6;
    font-family: Arial, sans-serif;
    padding: 20px;
    white-space: pre-wrap;}
    h1{
    text-align: center;
    text-tranform: uppercase;
    font-size: 24px;
    padding: 0 !important;
    margin-bottom: 0;}
    .sub{
     text-align: center;
     margin-top: 0;
     padding: 0 !important;
    }
     @page{
     margin: 1cm;}
    </style>
    <pre class="ata">
    ${textoAta}
    <button class= "no-print" onclick="window.print()">Impressão</button>
    </pre>`
);

return textoAta;
}

document.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.getElementById('modal-container');
    const modalTextarea = document.getElementById('modal-textarea');
    const btnSalvar = document.getElementById('btn-salvar');
    const btnCancelar = document.getElementById('btn-cancelar');

    let celulaAtual = null;

    document.querySelectorAll('.tabela textarea').forEach(textarea => {
        textarea.addEventListener('dblclick', (event) => {
            celulaAtual = event.target;
            modalTextarea.value = celulaAtual.value;
            modalContainer.classList.add('ativo');
            modalTextarea.focus();
        });
    });

    btnSalvar.addEventListener('click', () => {
    if (celulaAtual) {
        celulaAtual.value = modalTextarea.value;

        let itemId = celulaAtual.id;
        dadosEscala[itemId] = modalTextarea.value;
        localStorage.setItem("minha-tabela", JSON.stringify(dadosEscala));
    }
    fecharModal();
});

    btnCancelar.addEventListener('click', () => {
        fecharModal();
    });

    modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
            fecharModal();
        }
    });

    function fecharModal() {
        modalContainer.classList.remove('ativo');
        celulaAtual = null;
        modalTextarea.value = '';
    }
});