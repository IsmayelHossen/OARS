import React from 'react';
class suceessClasses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        $(document).ready( function () {
            $('#table_id').DataTable();
        } );
    }
    render() {
        return (
         <>
         <h2>ok done</h2>

         </>
         );
    }
}

export default suceessClasses;
