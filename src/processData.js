const processData = (dataFile, processText, setError, setLoaded) => {

    fetch(`${process.env.PUBLIC_URL}/${dataFile}`)
        .then(res => res.text())
        .then(text => {
            processText(text);
            setLoaded(true);
        }, error =>{
            setError(error);
            setLoaded(true);
        });
};

export default processData;
