// document.querySelector('#btn-search').addEventListener('keydown', function(event) {
//   if (event.keyCode === 13) { // Verifica se a tecla Enter foi pressionada
//       buscarPrompt();         // Chama a função
//   } else {
//       return false;           // Previne outros comportamentos, se necessário
//   }
// });

document.querySelector('#btn-search').addEventListener('click', buscarPrompt);

async function buscarPrompt() {
  const lista = document.querySelector('ul');


  await axios.post('http://localhost:3000/', {prompt: document.querySelector('#prompt').value}).then(({data}) => {
    document.querySelector('#prompt').value = '';
    lista.innerText = "";
    lista.scrollTop = 0;

    data.results.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const p = document.createElement("p");

      a.textContent = item.title;
      p.textContent = item.href
      a.href = item.href;
      a.setAttribute('target', '_blank');
      a.append(p);

      li.append(a);
      lista.appendChild(li);
    });
  });
}