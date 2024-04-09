import { getUsers } from "@/lib/data"
import styles from './adminUsers.module.css';

const AdminUsers = async () => {

    const users = await getUsers()

    return (
        <div className={styles.container}>
            <h1>Users</h1>
            {users.map((user)=>(
                <div className={styles.user} key={user.username}>
                    <div className={styles.detail}>
                        <Image src={user.img || "/noAvatar.png"} alt="" width={50} height={50} />
                        <span className={styles.userTitle}>{user.title}</span>
                    </div>
                    <form action={deletePost}>
                        <input type="hidden" name="id" value={post.id} />
                        <button className={styles.postButton}>Delete</button>
                    </form>
                </div>
            ))}
        </div>
    )
}

export default AdminUsers;