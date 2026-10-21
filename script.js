let tarefas = [];

// Salva a lista de tarefas no localStorage do navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cria o item da tarefa na tela com os botões de editar, remover e marcar como concluída
function criarElementoNaTela(text) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";

    li.appendChild(span);
    li.appendChild(document.createTextNode(" "));
    li.appendChild(btnEditar);
    li.appendChild(document.createTextNode(" "));
    li.appendChild(btnRemover);

    document.getElementById("lista").appendChild(li);

    span.addEventListener("click", function() {
        span.classList.toggle("concluida");
    });

    btnRemover.addEventListener("click", function() {
        li.remove();

        tarefas = tarefas.filter(t => t !== text);
        salvarTarefas();
    });

    btnEditar.addEventListener("click", function() {
        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;
        input.style.padding = "8px";
        input.style.borderRadius = "8px";
        input.style.border = "2px solid #6c63ff";
        input.style.backgroundColor = "#0f0f1a";
        input.style.color = "white";
        input.style.fontSize = "14px";

        const textoAntigo = span.textContent;
        li.replaceChild(input, span);

        input.focus();

        // Troca o texto antigo pelo novo e salva a alteração
        function salvarEdicao() {
            const novoTexto = input.value.trim();

            if (novoTexto !== "") {
                span.textContent = novoTexto;

                const index = tarefas.indexOf(textoAntigo);
                if (index !== -1) {
                    tarefas[index] = novoTexto;
                    salvarTarefas();
                }

                text = novoTexto;
            }

            li.replaceChild(span, input);
        }

        input.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                salvarEdicao();
            }
        });

        input.addEventListener("keydown", function(e) {
            if (e.key === "Escape") {
                li.replaceChild(span, input);
            }
        });

        input.addEventListener("blur", function() {
            salvarEdicao();
        });
    });
}

// Adiciona uma nova tarefa a partir do campo de texto
function adicionar() {
    const input = document.getElementById("meuInput");
    const text = input.value;

    if (text.trim() === "") return;

    criarElementoNaTela(text);

    tarefas.push(text);
    salvarTarefas();

    input.value = "";
}

// Carrega as tarefas salvas no localStorage quando a página abre
function carregarTarefas() {
    const dados = localStorage.getItem("tarefas");

    if (dados) {
        tarefas = JSON.parse(dados);

        tarefas.forEach(function(tarefa) {
            criarElementoNaTela(tarefa);
        });
    }
}

carregarTarefas();
