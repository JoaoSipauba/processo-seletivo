export function storageClear(option) {
    if (option === "all") {
        sessionStorage.setItem("curso", "");
        sessionStorage.setItem("cargaHoraria", "");
        sessionStorage.setItem("idCurso", "");
        sessionStorage.setItem("aluno", "");
        sessionStorage.setItem("codigo", "");
        sessionStorage.setItem("cpf", "");
        sessionStorage.setItem("endereco", "");
        sessionStorage.setItem("cep", "");
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("telefone", "");
    }else{
        sessionStorage.setItem("aluno", "");
        sessionStorage.setItem("codigo", "");
        sessionStorage.setItem("cpf", "");
        sessionStorage.setItem("endereco", "");
        sessionStorage.setItem("cep", "");
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("telefone", "");
    }
}