use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

// 這裡就像是program的main
// 所有program一進來都會先到你指定的這個entrypoint上
// 在執行時會傳入三個參數
// program id => 這個就是當前的program的id
// accounts => 由client傳入，這次操作需要的account，solana在發交易的時候就要把所有需要的accoutn都帶入，無法在program上動態加載
// instruction_data => 由client傳入，需要的data，會是一個uint8的array，如何切分就要跟client協調好。

// here is like a main function
// when an instruction executes, it will run into here first.
// it will also pass three arguments
// - program id => this is the current program id
// - accounts => passed by client, you will need to pass all accounts you need in this operation, you can't load them dynamically
// - instruction_data => passed by client, the data you need, the format will be uint8 array. how to separate them into meaningful segment depends your prgoram

entrypoint!(process_instruction);
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("program id {:?}", program_id);
    for account in accounts {
        msg!("accounts {:?}", account);
    }
    msg!("data {:?}", instruction_data);
    Ok(())
}
