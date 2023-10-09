<script lang="ts">
  let count1: number = 1.0
  let count2: number
  let currencyCode: string
  let option: Array<string> = ['USD', 'EUR', 'KZT', 'RUB' ]
  let finishCode: string
  const getRequest = (currency: string, finish: string, check: boolean) => {
    fetch(`https://open.er-api.com/v6/latest/${currency}`)
      .then(response => response.json())
        .then(data => {
          const rate = data.rates[finish];
          if(check) count2 = Number((count1 * rate).toFixed(2));
          else count1 = Number((count2 * rate).toFixed(2));
        });
  }

  $: {
    getRequest(currencyCode, finishCode, true)
  }
</script>

<main>
  <label class='cur'>
    <input type="number" bind:value={count1} on:input={() => getRequest(currencyCode, finishCode, true)} />
    <select bind:value={currencyCode}>
    {#each option as value}
      <option>{value}</option>
    {/each}
    </select>
  </label>
  <br/>
  <label class='fin'>
    <input type="number" bind:value={count2} on:input={() => getRequest(finishCode, currencyCode, false)} />
    <select bind:value={finishCode}>
    {#each option.reverse() as value}
      <option>{value}</option>
    {/each}
    </select>
  </label>
</main>

<style>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
}

.cur{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fin{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<!-- <script>
  let baseCurrency = '';
  let targetCurrency = '';
  let baseAmount = 0;
  let targetAmount = 0;

  function convert() {
    fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[targetCurrency];
        targetAmount = baseAmount * rate;
      });
  }

  $: {
    convert();
  }

</script>

<div>
  <h1>Currency Converter</h1>
  <label for="baseCurrency">Base Currency:</label>
  <input type="text" id="baseCurrency" bind:value="{baseCurrency}" />

  <label for="targetCurrency">Target Currency:</label>
  <input type="text" id="targetCurrency" bind:value="{targetCurrency}" />

  <label for="baseAmount">Base Amount:</label>
  <input type="number" id="baseAmount" bind:value="{baseAmount}" />

  <label for="targetAmount">Target Amount:</label>
  <input type="number" id="targetAmount" bind:value="{targetAmount}" readonly />

  <button on:click="{convert}">Convert</button>
</div>
 -->
