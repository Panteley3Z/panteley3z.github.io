export function buildListFrom(obj) {
    if (!Object.keys(obj).length) return;

    const ul = document.createElement('ul');
    for (let item in obj) {
        const li = document.createElement('li');
        li.innerHTML = item;
        
        const subItem = createListFrom(obj[item]);
        if (subItem) {
            li.appendChild(subItem)
        }
        ul.appendChild(li);
    }
    return ul
}
