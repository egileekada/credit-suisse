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
  const handlePost = async (postData: any, image: any): Promise<any> => {   
    
    const formData = new FormData() 

    formData.append("first_name",postData.first_name)
    formData.append("last_name",postData.last_name)
    formData.append("other_name",postData.other_name)
    formData.append("email",postData.email)
    formData.append("phone",postData.phone)
    formData.append("gender",postData.gender)
    formData.append("dob",postData.dob)
    formData.append("country_of_birth",postData.country_of_birth)
    formData.append("nationality",postData.nationality)
    formData.append("marital_status",postData.marital_status) 
    formData.append("residential_address",postData.residential_address)
    formData.append("ssn",postData.ssn)
    formData.append("employment_status",postData.employment_status)
    formData.append("account_type",postData.account_type)
    formData.append("next_of_kin",postData.next_of_kin)
    formData.append("account_number",postData.account_number)
    formData.append("balance",postData.balance)
    formData.append("password",postData.password)
    formData.append("password_confirmation",postData.password_confirmation)
    formData.append("photo", image) 
    try{ 
        const response = await axios.post('/admin/users/add-account', formData,
        {
          headers: {
            'Content-Type': image.type, 
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
  const handleUpdateUser = async (postData: any, index: any, image: any): Promise<any> => {     
    
    const formData = new FormData() 

    formData.append("first_name",postData.first_name)
    formData.append("last_name",postData.last_name)
    formData.append("other_name",postData.other_name)
    formData.append("email",postData.email)
    formData.append("phone",postData.phone)
    formData.append("gender",postData.gender)
    formData.append("dob",postData.dob)
    formData.append("country_of_birth",postData.country_of_birth)
    formData.append("nationality",postData.nationality)
    formData.append("marital_status",postData.marital_status) 
    formData.append("residential_address",postData.residential_address)
    formData.append("ssn",postData.ssn)
    formData.append("employment_status",postData.employment_status)
    formData.append("account_type",postData.account_type)
    formData.append("next_of_kin",postData.next_of_kin)
    formData.append("account_number",postData.account_number)
    formData.append("balance",postData.balance)
    formData.append("password",postData.password)
    formData.append("password_confirmation",postData.password_confirmation)
    {image !== "hello" && ( 
      formData.append("photo", image)   
    )}
    try{ 
        const response = await axios.post('/admin/users/'+index, formData,
        {
          headers: {
            'Content-Type':image.type, 
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

