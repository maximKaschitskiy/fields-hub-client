const Mogrt = () => {
    return (
      <section className="mogrt">
        <p>Active Selected: <span>{activeSeq}</span></p>
          <button
            className="mogrt__scan"
            onClick={() => {
              const csInterface = new CSInterface();
              csInterface.evalScript("$._PPP_.getMogrtVals()", (data) => {
                console.log(data);
                const dataArray = data.split(',');
                if (data) {
                  setMogrtFields(dataArray);
                }
              });
            }}
            disabled={activeSeq === '' ? true : false}
          >Scan</button>
      </section>
    )
  }