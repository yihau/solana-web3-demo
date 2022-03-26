use solana_program::{
    account_info::next_account_info, account_info::AccountInfo, entrypoint,
    entrypoint::ProgramResult, msg, program::invoke_signed, program_error::ProgramError,
    pubkey::Pubkey, system_instruction,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    data: &[u8],
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();

    let from_account_info = next_account_info(account_info_iter)?;
    let to_account_info = next_account_info(account_info_iter)?;
    let _system_program_account_info = next_account_info(account_info_iter)?;

    let mut fixed_data = [0u8; 8];
    fixed_data.copy_from_slice(&data[0..8]);
    let amount = u64::from_le_bytes(fixed_data);

    let seed = b"PDA";
    let (_, bump) = Pubkey::find_program_address(&[seed], program_id);

    invoke_signed(
        &system_instruction::transfer(&from_account_info.key, &to_account_info.key, amount),
        &[from_account_info.clone(), to_account_info.clone()],
        &[&[seed, &[bump]]],
    )?;

    Ok(())
}
