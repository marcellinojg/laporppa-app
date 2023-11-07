

export const formatDate = (date: string, withTime: boolean) => {
    if (!date) return '-'

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

export const formatDatePelaporan = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
}

export const combineDateAndTimePelaporan = (date : Date, time: string) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${time}:00`
}
