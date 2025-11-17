const select = document.getElementById('selekt');
const blik = document.getElementById('blik');
const kodInput = document.getElementById('kod');
const form = document.getElementById('formularz');

select.addEventListener('change', () => {
    if (select.value === 'kopia') {
        blik.style.display = 'block';
        kodInput.required = true; 
    } else {
        blik.style.display = 'none';
        kodInput.required = false;
    }
});



const textarea = document.getElementById('wiadomosc');

function autoResize() {
    this.style.height = 'auto'; 
    this.style.height = this.scrollHeight + 'px'; 
}
textarea.addEventListener('input', autoResize);



  