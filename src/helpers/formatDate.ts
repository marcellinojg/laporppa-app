

const formatDate = (date: string, withTime: boolean) => {
    const dateObj = new Date(date)
    const options = withTime === true ? {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    } : {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    } as any

    return dateObj.toLocaleDateString('id-ID', options)
}

export default formatDate