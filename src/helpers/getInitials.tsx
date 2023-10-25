

const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0).toUpperCase()).join('')
}

export default getInitials