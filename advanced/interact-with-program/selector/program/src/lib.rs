use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

entrypoint!(process_instruction);
fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    data: &[u8],
) -> ProgramResult {
    // 我們可以拆第一個byte當作是selector
    // we can split first byte as selector
    let (&instruction, _rest) = data
        .split_first()
        .ok_or(ProgramError::InvalidInstructionData)?;

    match instruction {
        1 => {
            msg!("here is instruction 1");
        }
        2 => {
            msg!("here is instruction 2");
        }
        _ => {
            msg!("no such instruction");
            return Err(ProgramError::InvalidInstructionData);
        }
    }
    Ok(())
}
