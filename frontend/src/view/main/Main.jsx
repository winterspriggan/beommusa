import React, { useEffect, useState } from 'react';

function ExternalHtmlComponent({user}) {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        fetch('/main.html')
            .then(response => response.text())
            .then(data => setHtmlContent(data));
    }, []);

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default ExternalHtmlComponent;
