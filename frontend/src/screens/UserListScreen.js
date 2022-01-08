import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Table, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
    getListUser,
    deleteUserByAdmin,
} from '../actions/userActions'

function UserListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { users, loading, error } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {
        loading: deleteLoading,
        success: deleteSuccess
    } = userDelete


    const [show, setShow] = useState(false);
    const [clickedUser, setClickedUser] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getListUser())
        }
        else {
            navigate('/login')
        }
    }, [dispatch, navigate, deleteSuccess])

    // burada deleteSuccess değişkenini ekleyerek silme işlemi başarılı olduğumda getListUser()'ı tekrar çalıştırtıyoruz

    const deleteUser = (id) => {
        dispatch(deleteUserByAdmin(id))
    }

    return (
        <div>
            <h1>All Users</h1>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Doğrulama</Modal.Title>
                </Modal.Header>
                <Modal.Body><strong>"{clickedUser.username}"</strong> kullanıcı adlı kişiyi silmek istediğinize emin misiniz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleClose}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={() => { deleteUser(clickedUser.id); handleClose() }}>
                        Sil
                    </Button>
                </Modal.Footer>
            </Modal>

            {
                loading || deleteLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Table striped responsive className='table-sm text-center'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? (
                                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                                    ) : (
                                        <i className='fas fa-check' style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/`}>
                                            <Button variant='success' className='btn btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        {!user.isAdmin && (
                                            <Button
                                                variant='danger'
                                                className='btn btn-sm'
                                                onClick={() => { handleShow(); setClickedUser(user); }}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        )}

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                )
            }
        </div >
    )
}

export default UserListScreen
