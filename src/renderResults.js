const renderResults = (error, loaded, title, results) => {

    if (error) {
        return(
            <>
                <h2>{title}</h2>
                <p>Error: <strong>{error.message}</strong></p>
            </>
        );
    } else if (!loaded) {
        return(
            <>
                <h2>{title}</h2>
                <p>Loading...</p>
            </>
        );
    } else {
        return (
            <>
                <h2>{title}</h2>
                {results()}
            </>
        );
    }
};

export default renderResults;
