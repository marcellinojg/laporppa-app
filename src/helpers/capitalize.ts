

const capitalize = (text: string) => {
    return text.split(' ').map((t) => `${t.charAt(0).toUpperCase()}${t.slice(1)}`).join('')
}

export default capitalize