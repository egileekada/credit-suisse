import axios from "../utils/axios"; 

export function useGetDataCallback() {
  const handleGetData = async (postData: any, ): Promise<any> => {    
    try{ 
        const response = await axios.get(postData,
        {
            headers: {
                'Content-Type':'application/json', 
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }, 
        }); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }
  return { handleGetData }
} 

export function usePostCallback() {
  const handlePost = async (postData: any): Promise<any> => {    
    try{ 
        const response = await axios.post('/admin/users/add-account', postData,
        {
          headers: {
            'Content-Type':'application/json', 
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }, 
        }); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }
  return { handlePost }
}

export function useUpdateUserCallback() {
  const handleUpdateUser = async (postData: any, index: any): Promise<any> => {    
    try{ 
        const response = await axios.post('/admin/users/'+index, postData,
        {
          headers: {
            'Content-Type':'application/json', 
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }, 
        }); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }
  return { handleUpdateUser }
}

export function useChangeStatusCallback() {
  const handleChangeStatus = async (postData: any, index: any): Promise<any> => {    
    try{ 
        const response = await axios.put('/admin/users/change-status/'+index, postData,
        {
          headers: {
            'Content-Type':'application/json', 
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }, 
        }); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }
  return { handleChangeStatus }
}

export function useUpdateBalanceCallback() {
  const handleUpdateBalance = async (postData: any, index: any): Promise<any> => {    
    try{ 
        const response = await axios.put('/admin/users/update-balance/'+index, postData,
        {
          headers: {
            'Content-Type':'application/json', 
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }, 
        }); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }
  return { handleUpdateBalance }
}

export function useDeleteCallback() {
  const handleDelete = async (postData: any): Promise<any> => {    
    try{ 
        const response = await axios.delete('/admin/users/'+postData,
        {
          headers: {
            'Content-Type':'application/json', 
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }, 
        }); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }
  return { handleDelete }
}

