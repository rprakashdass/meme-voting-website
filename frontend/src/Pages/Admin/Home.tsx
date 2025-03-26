
const navItems = [
    {
        title : 'Users',
        link : 'http://localhost:5173/admin/users'
    },
    {
        title : 'Meme Owners',
        link : ''
    },
    {
        title : 'Memes',
        link : ''
    },
]

const AdminHome = () => {
  return (
    <div className="m-5">
        <div className="flex items-center justify-center">
            <div className="flex flex-row gap-5 flex-wrap justify-center items-center">
                {
                    navItems.map( (item, id) => (
                        <div className="flex flex-col p-5 justify-center items-center border border-blue-600 gap-5" key={id}>
                                <h1>{item.title}</h1>
                                <a href={item.link} className="button bg-blue-600 px-3 py-2 rounded-md">click here</a>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default AdminHome;