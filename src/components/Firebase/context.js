/*
** Using React Context API to provide a Firebase instance once
** at the top level of the component hierarchy
*/


import React from 'react';

const FirebaseContext = React.createContext(null);

/*
higher order component will pass down the firebase class to all lower level components.
Now all methods from firebase will be accessible such as signin, signup and signout.
*/
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        { firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

export default FirebaseContext;