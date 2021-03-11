export default function randomPet() {
    let i = Math.floor(Math.random() * 2);
    if (i === 0) return 'cat';
    if (i === 1) return 'dog';
}