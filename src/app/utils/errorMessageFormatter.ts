export const formatErrorMessage = (error:any) => {
    if (error.error?.message) {
        let errorMessage = error.error?.message;
        console.log('formatErrorMessage: Error message: ', errorMessage);
        
        if (Array.isArray(errorMessage)) {
          return errorMessage?.join(",");
        }
        return errorMessage;
    }
    return error;
}